import { synchronize } from '@nozbe/watermelondb/sync'
import { useNetInfo } from '@react-native-community/netinfo'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import LogoSvg from '../../assets/logo.svg'
import { Car } from '../../components/Car'
import { LoadAnimation } from '../../components/LoadAnimation'
import { database } from '../../database'
import { Car as ModelCar } from '../../database/model/Car'
import { CarDto } from '../../dto/CarDto'
import api from '../../services/api'
import {
    CarList,
    Container, Header, HeaderContent, TotalCars
} from './styles'




export function Home() {
    const [cars, setCars] = useState<ModelCar[]>([])
    const [loading,setLoading] = useState(true)
    const netInfo = useNetInfo()
    const navigation = useNavigation()

    function handleCarDetails(car: CarDto){
        navigation.navigate('CarDetails', {car})
    }

    async function offLineSynchronize() {
        await synchronize({
            database,
            pullChanges: async({lastPulledAt}) =>{
                const response = await api
                .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)

                const {changes, lastPulledVersion} = response.data
                return {changes, timestamp: lastPulledVersion}
            },
            pushChanges: async ({changes}) =>{
                const {users} = changes
                if (users.updated.length > 0) {
                    await api.post("/users/sync", users);
                  }
                
            }
        })
    }

    useEffect(() => {
        let isMounted = true

        async function fetchCars() {
            try {
                const carCollection = database.get<ModelCar>('cars')
                const cars = await carCollection.query().fetch()
                if(isMounted){
                    setCars(cars)
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
        if(netInfo.isConnected === true){
            offLineSynchronize()
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
