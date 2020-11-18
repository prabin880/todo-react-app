import React from 'react';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/postActions'
import PropTypes from 'prop-types'

class Posts extends React.Component{
    componentWillMount(){
        this.props.fetchPosts();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.newPost !== prevProps.newPost) {
          this.props.posts.unshift(prevProps.newPost);
        }
      }
    componentWillReceiveProps(nextProps){
        if(nextProps.newPost){
            this.props.posts.unshift(nextProps.newPost);
        }
    }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.newPost) {
    //       return this.props.posts.unshift(nextProps.newPost);
    //     }
    //     return null;
    // }
      
    
    render(){
        return (
            <div>
                <h1>Posts</h1>
                {this.props.posts.map(post => 
                <div key={post.id}> 
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>)}
            </div>
        )
    }
}

Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts })(Posts);