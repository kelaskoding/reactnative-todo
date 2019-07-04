import React, {Component} from 'react';
import { Container, Content, Header, Text, Left, Body,Icon, Right, ListItem, CheckBox, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class Detail extends Component{


    checkBoxHandler = val =>{
        console.log(val.checked);
    }

    checkProps(){
        return this.props.todoItem.status===1? true : false;
    }

  render() {
    return (
     <Container>
         <Header>
             <Left><Icon name='arrow-back' style={{color:'white', fontWeight:'500'}} onPress={()=>{
                 Actions.pop();
             }}/></Left>
            <Body><Text style={{color:'white', fontWeight:'500'}}>Detail Todo</Text></Body>
            <Right></Right>
            </Header>
            <Content style={{padding:10}}>
                <ListItem>
                    <CheckBox onPress={this.checkBoxHandler} checked={this.checkProps()} color='green'/> 
                    <Body>
                        <Text>{this.props.todoItem.title}</Text>
                    </Body>
                </ListItem>
                <Button full danger style={{marginTop:20}}>
                    <Text>Update Todo</Text>
                </Button>
            </Content>
     </Container>
    );
  }
}

