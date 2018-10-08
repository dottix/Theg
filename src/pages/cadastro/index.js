import React, { Component } from 'react';

import {
  ScrollView,
  View,
  StatusBar,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements';
import styles from './styles';

class Cadastro extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func,
      navigate: PropTypes.func,
      state: PropTypes.shape({
        key: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    nome: '',
    usuario: '',
    email: '',
    cpf: '',
    nascimento: '',
    senha: '',
    confSenha: '',
    guia: false,
    turista: false,
    ambos: false,
    disabled: false,
  };

  validaVoltar = () => {
    if (this.props.navigation.state.key === 'Cadastro') {
      this.props.navigation.navigate('Perfil');
    }
    this.props.navigation.goBack();
  };

  check = () => {
    if (this.state.ambos) {
      this.setState({
        guia: false,
        turista: false,
        ambos: false,
        disabled: false,
      });
    } else {
      this.setState({
        guia: true,
        turista: true,
        ambos: true,
        disabled: true,
      });
    }
  };

  validate = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(email) === false){
      Alert.alert(
        'E-mail não valido.',
        'Favor informar um e-mail correto.',
      );
    }
  }

  validarCPF = (cpf) => {	
    cpf = cpf.replace(/[^\d]+/g,'');	
    if(cpf == '') return false;	
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 || 
      cpf == "00000000000" || 
      cpf == "11111111111" || 
      cpf == "22222222222" || 
      cpf == "33333333333" || 
      cpf == "44444444444" || 
      cpf == "55555555555" || 
      cpf == "66666666666" || 
      cpf == "77777777777" || 
      cpf == "88888888888" || 
      cpf == "99999999999")
        return false;		
    // Valida 1o digito	
    add = 0;	
    for (i=0; i < 9; i ++)		
      add += parseInt(cpf.charAt(i)) * (10 - i);	
      rev = 11 - (add % 11);	
      if (rev == 10 || rev == 11)		
        rev = 0;	
      if (rev != parseInt(cpf.charAt(9)))		
        return false;		
    // Valida 2o digito	
    add = 0;	
    for (i = 0; i < 10; i ++)		
      add += parseInt(cpf.charAt(i)) * (11 - i);	
    rev = 11 - (add % 11);	
    if (rev == 10 || rev == 11)	
      rev = 0;	
    if (rev != parseInt(cpf.charAt(10)))
      return false;		
    return true;   
  }

  submit = () => {
      
    if (!this.state.nome) {
      Alert.alert(
        'Nome não informado',
        'Favor informar um nome.',
      );
      return
    }

    if (!this.state.usuario) {
      Alert.alert(
        'Usuário não informado',
        'Favor informar um usuário.',
      );
      return
    }

    if (!this.state.email) {
      Alert.alert(
        'Email não informado',
        'Favor informar um e-mail valido.',
      );
      return
    }

    if (!this.state.cpf) {
      Alert.alert(
        'CPF não informado',
        'Favor informar um CPF valido.',
      );
      return      
    }

    if (!this.validarCPF(this.state.cpf)) {
      Alert.alert(
        'CPF Incorreto',
        'Favor informar um CPF valido.',
      );
      return
    }

    if (!this.state.nascimento) {
      Alert.alert(
        'Data de nascimento não informada',
        'Favor informar uma data de nascimento valida.',
      );
      return
    }

    if (!this.state.senha) {
      Alert.alert(
        'Senhas não informada',
        'Favor informar uma senha valida.',
      );
      return      
    }

    if (this.state.senha !== this.state.confSenha) {
      Alert.alert(
        'Senhas incorretas',
        'Favor verificar e tentar novamente.',
      );
      return
    }

    if (!this.state.guia && !this.state.turista) {
      Alert.alert(
        'Pefil não informado',
        'Favor informar o perfil.',
      );
      return      
    }
    
  }

  render() {
    console.tron.log(this.props.navigation);
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.containerImage}>
          <Image source={require('images/theg.png')} style={styles.image} />
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome Completo"
            placeholderTextColor="#2c4eb8"
            underlineColorAndroid="transparent"
            onSubmitEditing={() => this.inputUsuario.focus()}
            keyboardType="email-address"
            // value={String(product.qtt)}
            onChangeText={nome => this.setState({ nome })}
          />

          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Usuário"
            placeholderTextColor="#2c4eb8"
            underlineColorAndroid="transparent"
            onSubmitEditing={() => this.inputEmail.focus()}
            ref={(input) => { this.inputUsuario = input; }}
            // value={String(product.qtt)}
            onChangeText={usuario => this.setState({ usuario })}
          />

          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="E-Mail"
            placeholderTextColor="#2c4eb8"
            underlineColorAndroid="transparent"
            onSubmitEditing={() => this.inputCpf.focus()}
            ref={(input) => { this.inputEmail = input; }}
            // value={String(product.qtt)}
            onChangeText={email => this.setState({ email })}
          />

          <View style={styles.cpfNasc}>
            <TextInput
              style={styles.inputCpf}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="CPF"
              placeholderTextColor="#2c4eb8"
              underlineColorAndroid="transparent"
              onSubmitEditing={() => this.inputNasc.focus()}
              ref={(input) => { this.inputCpf = input; }}
              // value={String(product.qtt)}
              onChangeText={cpf => this.setState({ cpf })}
            />

            <TextInput
              style={styles.inputNasc}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Nascimento"
              placeholderTextColor="#2c4eb8"
              underlineColorAndroid="transparent"
              onSubmitEditing={() => this.inputSenha.focus()}
              ref={(input) => { this.inputNasc = input; }}
              // value={String(product.qtt)}
              onChangeText={nascimento => this.setState({ nascimento })}
            />
          </View>

          <TextInput
            style={styles.input}
            autoCorrect={false}
            secureTextEntry
            autoCapitalize="none"
            placeholder="Senha"
            placeholderTextColor="#2c4eb8"
            underlineColorAndroid="transparent"
            onSubmitEditing={() => this.inputConfir.focus()}
            ref={(input) => { this.inputSenha = input; }}
            // value={String(product.qtt)}
            onChangeText={senha => this.setState({ senha })}
          />

          <TextInput
            style={styles.input}
            autoCorrect={false}
            secureTextEntry
            autoCapitalize="none"
            placeholder="Confirme sua Senha"
            placeholderTextColor="#2c4eb8"
            underlineColorAndroid="transparent"
            ref={(input) => { this.inputConfir = input; }}
            // value={String(product.qtt)}
            onChangeText={confSenha => this.setState({ confSenha })}
          />

          <Text style={styles.textPerfil}>Perfil desejado</Text>
          <View style={styles.box}>
            <CheckBox
              title="Guia"
              checkedColor={this.state.disabled ? '#ffa170' : '#ff7025'}
              uncheckedColor={this.state.disabled ? '#ffa170' : '#ff7025'}
              textStyle={[styles.textBox, this.state.disabled ? styles.checkDesabilitado : null]}
              containerStyle={styles.check}
              onPress={() => this.setState({ guia: !this.state.guia })}
              checked={this.state.guia}
              disabled={this.state.disabled}
            />
            <CheckBox
              title="Turista"
              checkedColor={this.state.disabled ? '#ffa170' : '#ff7025'}
              uncheckedColor={this.state.disabled ? '#ffa170' : '#ff7025'}
              textStyle={[styles.textBox, this.state.disabled ? styles.checkDesabilitado : null]}
              containerStyle={styles.check}
              checked={this.state.turista}
              onPress={() => this.setState({ turista: !this.state.turista })}
              disabled={this.state.disabled}
            />
            <CheckBox
              title="Ambos"
              checkedColor="#ff7025"
              uncheckedColor="#ff7025"
              containerStyle={styles.check}
              textStyle={styles.textBox}
              checked={this.state.ambos}
              onPress={this.check}
            />
          </View>
          <View style={styles.botoesAcao}>
            <TouchableOpacity onPress={() => this.validaVoltar()} style={styles.buttonCanc}>
              <Text style={styles.titleCan}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.submit()} style={styles.buttonConf}>
              <Text style={styles.titleConf}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Cadastro;
