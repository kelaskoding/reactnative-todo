import React, {Component} from 'react';
import { Container, Content, Header, Text, Left, Body,Icon, Right, ListItem, Button } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';

const baseUrl = 'http://fakeapi.kelaskoding.com/api/v1';

export default class Detail extends Component{

    constructor(){
        super();
        this.state = {
            todo: {}
        }
    }

    componentWillReceiveProps(){
        this.setState({
            todo: this.props.todoItem
        });
    }

    updateToServer = ()=>{
        this.setState({loading:true});
                axios.put(baseUrl+'/todos',{
                    id: this.state.todo.id,
                    title: this.state.todo.title,
                    status: this.state.todo.status
                })
                .then(response => {
                    Actions.home({type: ActionConst.RESET});
                })
                .then(errors =>{
                    this.setState({
                        loading: false,
                        error: errors
                    });
                    console.log(errors);
                });
    }

    doneHandler = ()=>{
        temp = this.state.todo;
        temp.status = 1;
        this.setState({
            todo: temp
        },()=>{
            this.updateToServer();
        });
    }  

    undoneHandler = ()=>{
        temp = this.state.todo;
        temp.status = 0;
        this.setState({
            todo: temp
        },()=>{
            this.updateToServer();
        });
    }

  render() {
    return (
     <Container>
         <Header>
             <Left><Icon name='arrow-back' style={{color:'white', fontWeight:'500'}} onPress={()=>{
                 Actions.pop();
             }}/></Left>
            <Body><Text style={{color:'white', fontWeight:'500'}}>Detail Todo</Text></Body>
            <Right>
                {
                    this.props.todoItem.status===0 ?
                        <Button transparent onPress={this.doneHandler}><Text>Done</Text></Button> :
                        <Button transparent onPress={this.undoneHandler}><Text>Undone</Text></Button>
                }
            </Right>
            </Header>
            <Content style={{padding:10}}>
                <ListItem>
                    <Body>
                        <Text>{this.props.todoItem.title}</Text>
                    </Body>
                </ListItem>
            </Content>
     </Container>
    );
  }
}




