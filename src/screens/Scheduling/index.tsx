import { useNavigation, useRoute } from '@react-navigation/native'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'
import ArrowSvg from '../../assets/arrow.svg'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar'
import { CarDto } from '../../dto/CarDto'
import { getPlatformDate } from '../../utils/getPlatformDate'
import {
    Container, Content, DateInfo,
    DateTitle,
    DateValue, Footer, Header, RentalPeriod, Title
} from './styles'

interface RentalPeriodProps {
    startFormatted: string
    endFormatted: string
}

interface Params {
    car: CarDto
}

export function Scheduling(){
    const theme = useTheme()
    const navigation = useNavigation()
    const [lastSelectedDate, SetLastSelectedDate] = useState<DayProps>({} as DayProps)
    const [markedDates, setMarkedDastes] = useState<MarkedDateProps>({} as MarkedDateProps)
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps)
    const route = useRoute()
    const {car} = route.params as Params

    function handleSchedullingDetails(){
        navigation.navigate('SchedulingDetails', {
            car,
            dates: Object.keys(markedDates)
        }); 
    }
    function handleBack(){
        navigation.goBack()
    }

    function handleChangeDate(date: DayProps){
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
        let end = date
        
        if(start.timestamp > end.timestamp) {
            start= end 
            end = start
        }
        SetLastSelectedDate(end)
        const interval = generateInterval(start, end)
        setMarkedDastes(interval)

        const firstDate = Object.keys(interval)[0]
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

        setRentalPeriod({
            startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
        })
    }

   return(
      <Container>
            <Header>
                <StatusBar 
                    barStyle='light-content'
                    translucent
                    backgroundColor='transparent'
                />
                <BackButton onPress={handleBack} color={theme.colors.shape} />

                <Title>
                    Escolha uma {'\n'}
                    data de inicio e {'\n'}
                    fim do aluguel.
                </Title> 

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
                    </DateInfo>
                    <ArrowSvg  />
                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header> 

            <Content>
                <Calendar 
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button 
                    title='Confirmar' 
                    onPress={handleSchedullingDetails}
                    enabled={!!rentalPeriod.startFormatted}
                />
            </Footer>
      </Container>
   )
}