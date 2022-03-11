import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';
import {
   Container, Footer, Form, Header, Subtitle, Title
} from './styles';


export function SignIn(){
   const theme = useTheme()
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const {navigate} = useNavigation()
   const {signIn} = useAuth()

   async function handleSignIn() {
      try {
         const schema = Yup.object().shape({
            password: Yup.string()
               .required('A senha é obrigatória'),
            email: Yup.string()
               .required('E-mail obrigatório')
               .email('Digite um e-mail válido')
         })
         await schema.validate({email, password})
         signIn({email, password})
      } catch (error) {
         if(error instanceof Yup.ValidationError){
            Alert.alert("Opa", error.message)
         }else{
            Alert.alert('Error na Autenticação', 'Ocorreu um Erro ao fazer Login, verifique as credenciais.')
         }
         
      }
   }

   function handleNewAccount(){
      navigate('SignUpFirstStep')
   }

   return(
      <KeyboardAvoidingView behavior='position' enabled>
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
               <StatusBar 
                  barStyle='dark-content'
                  backgroundColor='transparent'
                  translucent
               />
               <Header>
                  <Title>Estamos{'\n'} quase lá.</Title>
                  <Subtitle>
                     Faça seu login para começar{'\n'} 
                     uma experiência incrível.
                  </Subtitle>
               </Header>

               <Form>
                  <Input 
                     iconName='mail'
                     placeholder='E-mail'
                     keyboardType='email-address'
                     autoCorrect={false}
                     autoCapitalize='none'
                     onChangeText={setEmail}
                     value={email}
                  /> 
                  <PasswordInput 
                     iconName='lock'
                     placeholder='Senha'
                     onChangeText={setPassword}
                     value={password}
                     
                  />
               </Form> 

               <Footer>
                  <Button  
                     title='Login' 
                     onPress={handleSignIn}
                     enabled={true}
                     loading={false}
                  />
                  <Button  
                     title='Criar conta gratuita' 
                     onPress={handleNewAccount}
                     color={theme.colors.shape}
                     light  
                     enabled={true}
                     loading={false}
                  />
               </Footer>
            </Container>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
   )
}