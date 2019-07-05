import React, {Component} from 'react';
import { Container, Left, Icon, Item, Content, Header, Body, Text, Right, Label, Input, Button } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';


const baseUrl = 'http://fakeapi.kelaskoding.com/api/v1';

export default class InputTodo extends Component{

    constructor(){
        super();
        this.state = {
            todoItem: ''
        }
    }

    inputTodoListener = val =>{
        this.setState({
            todoItem: val
        });
    }

    saveTodoHandler = () =>{
        if(this.state.todoItem.trim()=== ""){
            return;
        }

        axios.post(baseUrl+'/todos',{
            'title':this.state.todoItem
        })
        .then(response => {
            this.setState({
                todoItem:''
            });
            Actions.home({type: ActionConst.RESET});
        })
        .then(error =>{
            console.log(error);
        });
    }

    render() {
        return (
        <Container>
            <Header>
             <Left><Icon name='arrow-back' style={{color:'white', fontWeight:'500'}} onPress={()=>{
                 Actions.pop();
             }}/></Left>
            <Body><Text style={{color:'white', fontWeight:'500'}}>Add Todo</Text></Body>
            <Right></Right>
            </Header>
            <Content style={{padding:10}}>
                <Item floatingLabel style={{padding:10}}>
                    <Label>Todo Title</Label>
                    <Input style={{textDecorationLine:'none'}} onChangeText={this.inputTodoListener}/>
                </Item>
                <Button full primary style={{marginTop:20}} onPress={this.saveTodoHandler}>
                    <Text>Save Todo</Text>
                </Button>
            </Content>
        </Container>
    );
  }
}

