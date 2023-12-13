import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { TextInputMask } from 'react-native-masked-text';
import * as Yup from 'yup';

const Cliente = ({ navigation, route }) => {
  const acao = route.params.acao;
  const pessoaAntiga = route.params.pessoaAntiga;

  const validationSchema = Yup.object().shape({
    nome: Yup.string().min(5, 'Nome curto').max(50, 'Nome grande').required('Campo obrigatório'),
    username: Yup.string().min(14, 'Username curto').max(14, 'Username grande').required('Campo obrigatório'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    telefone: Yup.string().matches(/^\([1-9]{2}\) [0-9]{4,5}-[0-9]{4}$/, 'Telefone inválido').required('Campo obrigatório'),
  });

  const salvar = (pessoa) => {
    if (pessoaAntiga) {
      acao(pessoa, pessoaAntiga);
    } else {
      acao(pessoa);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          nome: pessoaAntiga ? pessoaAntiga.nome : '',
          username: pessoaAntiga ? pessoaAntiga.username : '',
          email: pessoaAntiga ? pessoaAntiga.email : '',
          telefone: pessoaAntiga ? pessoaAntiga.telefone : '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => salvar(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              mode='outlined'
              label='Nome'
              value={values.nome}
              onChangeText={handleChange('nome')}
              onBlur={handleBlur('nome')}
              error={errors.nome && touched.nome}
            />
            {(errors.nome && touched.nome) && <Text style={{ textAlign: 'center' }}>{errors.nome}</Text>}

            <TextInput
              style={styles.input}
              mode='outlined'
              label='Username'
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              error={errors.username && touched.username}
            />
            {(errors.username && touched.username) && <Text style={{ textAlign: 'center' }}>{errors.username}</Text>}

            <TextInput
              style={styles.input}
              mode='outlined'
              label='Email'
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email && touched.email}
            />
            {(errors.email && touched.email) && <Text style={{ textAlign: 'center' }}>{errors.email}</Text>}

            <TextInputMask
              style={[styles.input, styles.telefoneInput]}
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) 99999-9999',
              }}
              value={values.telefone}
              onChangeText={handleChange('telefone')}
              onBlur={handleBlur('telefone')}
              error={errors.telefone && touched.telefone}
              placeholder="Telefone"
            />
            {(errors.telefone && touched.telefone) && <Text style={{ textAlign: 'center' }}>{errors.telefone}</Text>}
            
            <Button mode='contained' onPress={handleSubmit} >Cadastrar</Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  telefoneInput: {
   
    height: 60,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
export default Cliente;

