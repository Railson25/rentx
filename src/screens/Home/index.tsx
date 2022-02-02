import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import LogoSvg from '../../assets/logo.svg'
import { Car } from '../../components/Car'
import { Load } from '../../components/Load'
import { CarDto } from '../../dto/CarDto'
import api from '../../services/api'
import {
    CarList,
    Container, Header, HeaderContent, MyCarsButton, TotalCars
} from './styles'


export function Home() {
    const navigation = useNavigation()
    const [cars, setCars] = useState<CarDto[]>([])
    const [loading,setLoading] = useState(true)

    const theme = useTheme()

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
                    <TotalCars>
                        Total 12 Carros
                    </TotalCars>
                </HeaderContent>
            </Header> 
            {loading ? <Load /> :
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <Car data={item} onPress={() => handleCarDetails(item)}/>}
                />
            }
            <MyCarsButton onPress={handleMyCars}>
                <Ionicons 
                    name='ios-car-sport' 
                    size={32} 
                    color={theme.colors.shape}
                />
            </MyCarsButton>    
            
        </Container>
    )
}