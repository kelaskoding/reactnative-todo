
import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import axios from 'axios';
import { ListItem, Body, CheckBox, Spinner, Fab, Icon, Container, Header, Right, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';


const baseUrl = 'http://fakeapi.kelaskoding.com/api/v1';

export default class HomeFlatList extends Component{

    constructor(){
        super();
        this.state = {
            loading: false,
            data: [],
            page: 1,
            error: null
        }
    }

    componentDidMount(){
        this.loadDataFromServer();
    }

    loadDataFromServer = () =>{
        let page = this.state.page;
        this.setState({loading:true});

            axios.get(baseUrl+'/todos/'+page+'/10')
            .then(response => {
                this.setState({
                    loading: false,
                    data: page===1 ? response.data.data.subset : [...this.state.data, ...response.data.data.subset]
                });
            })
            .then(errors =>{
                this.setState({
                    loading: false,
                    error: errors
                });
                console.log(errors);
            });
    };

    handleLoadMore = () =>{
        this.setState({
            page: this.state.page + 1
        }, ()=>{
            this.loadDataFromServer();
        });
    }

    render(){
        return(
            <Container>
                <Header>
                    <Body><Text style={{color:'white', fontWeight:'500'}}>Todo List</Text></Body>
                    <Right>
                        <Button transparent><Icon name='search' style={{color:'white', fontWeight:'500'}}/></Button>
                    </Right>
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
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}
                    />
                    <Fab position='bottomRight' style={{backgroundColor:'blue'}} onPress={()=>{Actions.input();}}>
                        <Icon name='add'/>
                    </Fab>
                </View>
            </Container>
        );
    }
}