import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { BackHandler, StatusBar, StyleSheet } from 'react-native'
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import LogoSvg from '../../assets/logo.svg'
import { Car } from '../../components/Car'
import { LoadAnimation } from '../../components/LoadAnimation'
import { CarDto } from '../../dto/CarDto'
import api from '../../services/api'
import {
    CarList,
    Container, Header, HeaderContent, TotalCars
} from './styles'

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)


export function Home() {
    const navigation = useNavigation()
    const [cars, setCars] = useState<CarDto[]>([])
    const [loading,setLoading] = useState(true)
    const theme = useTheme()

    const positionY = useSharedValue(0)
    const positionX = useSharedValue(0)

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return{
            transform: [
                {translateX: positionX.value},
                {translateY: positionY.value}
            ]
        }
    })

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(event, ctx: any){
            ctx.positionX = positionX.value
            ctx.positionY = positionY.value
        },
        onActive(event, ctx: any){
            positionX.value = ctx.positionX + event.translationX
            positionY.value = ctx.positionY + event.translationY
        },
        onEnd(){
            positionX.value = withSpring(0);
            positionY.value = withSpring(0)
        }
    })

    function handleCarDetails(car: CarDto){
        navigation.navigate('CarDetails', {car})
    }

    function handleMyCars(){
        navigation.navigate('MyCars')
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/cars')
                setCars(response.data)
            } catch (error) {
                console.log(error)
            }finally{
               setLoading(false) 
            }
        }
        fetchCars()
    },[])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true
        })
    }, [])

    return (
        <Container>
            <StatusBar 
                barStyle='light-content'
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <LogoSvg 
                    width={RFValue(108)}  
                    height={RFValue(12)}  
                    />
                    { !loading &&
                        <TotalCars>
                            Total {cars.length} Carros
                        </TotalCars>
                    }
                </HeaderContent>
            </Header> 
            {loading ? <LoadAnimation /> :
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <Car data={item} onPress={() => handleCarDetails(item)}/>}
                />
            }
            <PanGestureHandler onGestureEvent={onGestureEvent} >
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22
                        }
                    ]}
                >
                    <ButtonAnimated onPress={handleMyCars} style={[styles.button, {backgroundColor: theme.colors.main}]}>
                        <Ionicons 
                            name='ios-car-sport' 
                            size={32} 
                            color={theme.colors.shape}
                        />
                    </ButtonAnimated>    
                </Animated.View>
            </PanGestureHandler>
        </Container>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})