
import React, { Component } from 'react';
import { Container, Header, Item, Icon, Input, Button, Text, Left, Body, ListItem, CheckBox} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { FlatList, View } from 'react-native'
import axios from 'axios';

const baseUrl = 'http://fakeapi.kelaskoding.com/api/v1';

export default class Search extends Component{

    constructor(){
        super();
        this.state = {
            keyword:'',
            data: [],
            error: null
        }
    }

    searchDataFromServer = () =>{
        if(this.state.keyword.trim()===''){
            this.setState({
                data: []
            });
        }else{
            this.setState({loading:true});
                axios.post(baseUrl+'/todos/search',{
                title:this.state.keyword
                })
                .then(response => {
                    this.setState({
                    loading: false,
                    data: response.data.data.subset
                    });
                })
                .then(errors =>{
                    this.setState({
                        loading: false,
                        error: errors
                    });
                    console.log(errors);
                });
        }
    };

    handleSearch = val =>{
        this.setState({
            keyword: val
        },()=>{
            setInterval(()=>{
                this.searchDataFromServer();
            },1500);
        });
    }

    render(){
        return(
            <Container>
                <Header searchBar rounded>
                    <Left>
                        <Icon name='arrow-back' style={{color:'white', fontWeight:'500'}} onPress={()=>{
                        Actions.pop();
                        }}/>
                    </Left>
                        <Item>
                        <Input placeholder="Search" onChangeText={this.handleSearch}/>
                        <Icon name="ios-search" />
                        </Item>
                </Header>
                <View style={{flex:1}}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) => (
                            <ListItem key={item.id} onPress={()=>{
                                Actions.detail({todoItem: item})
                            }}>
                            <Body><Text>{item.title}</Text></Body>
                                { item.status==1 ? <CheckBox checked={true} color='green'/> : <CheckBox checked={false} color='red'/>}
                            </ListItem>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </Container>
        );
    }
}