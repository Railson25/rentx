import { useNetInfo } from '@react-native-community/netinfo'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import LogoSvg from '../../assets/logo.svg'
import { Car } from '../../components/Car'
import { LoadAnimation } from '../../components/LoadAnimation'
import { CarDto } from '../../dto/CarDto'
import api from '../../services/api'
import {
    CarList,
    Container, Header, HeaderContent, TotalCars
} from './styles'



export function Home() {
    const [cars, setCars] = useState<CarDto[]>([])
    const [loading,setLoading] = useState(true)

    const netInfo = useNetInfo()
    const navigation = useNavigation()

    function handleCarDetails(car: CarDto){
        navigation.navigate('CarDetails', {car})
    }

    useEffect(() => {
        let isMounted = true

        async function fetchCars() {
            try {
                const response = await api.get('/cars')
                if(isMounted){
                    setCars(response.data)
                }
            } catch (error) {
                console.log(error)
            }finally{
                if(isMounted){
                    setLoading(false) 
                }
            }
        }
        fetchCars()
        return() => {
            isMounted = false
        }
    },[])

    useEffect(() => {
        if(netInfo.isConnected){
            Alert.alert('Conectado')
        }else{
            Alert.alert('Desconectado')
        }
    }, [netInfo.isConnected])

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
        </Container>
    )
}
