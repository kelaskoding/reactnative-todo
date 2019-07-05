
import React, { Component } from 'react';
import { Container, Header, ListItem, List, Body, Content, Text, View, Spinner, Button, CheckBox, Fab, Icon, Right } from 'native-base';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

const baseUrl = 'http://fakeapi.kelaskoding.com/api/v1';

export default class Home extends Component{

    constructor(){
        super();
        this.state = {
            todos: [],
            isLoading: true
        }
    }

    componentDidMount(){
        axios.get(baseUrl+'/todos/1/100')
        .then(response => {
            this.setState({
                isLoading: false,
                posts: response.data.data.subset
            });
        })
        .then(error =>{
            console.log(error);
        });
    }

    render(){
        let postList;
        if(this.state.posts){
        postList = this.state.posts.map(post=>{
            return(
            <ListItem key={post.id} onPress={()=>{
                Actions.detail({todoItem: post})
            }}>
                <Body><Text>{post.title}</Text></Body>
                { post.status==1 ? <CheckBox checked={true} color='green'/> : <CheckBox checked={false} color='red'/>}
            </ListItem>
        );
      });
    }
    return (
      <Container>
        <Header>
          <Body><Text style={{color:'white', fontWeight:'500'}}>Todo List</Text></Body>
          <Right>
              <Button transparent><Icon name='search' style={{color:'white', fontWeight:'500'}}/></Button>
          </Right>
        </Header>
        <Content>
          {
            this.state.isLoading ?
              <View><Spinner color='red'/></View>
            : 
            <List>{postList}</List>
          }
        </Content>
            <Fab position='bottomRight' style={{backgroundColor:'blue'}} onPress={()=>{Actions.input();}}>
                <Icon name='add'/>
            </Fab>
      </Container>
    );
    }
}