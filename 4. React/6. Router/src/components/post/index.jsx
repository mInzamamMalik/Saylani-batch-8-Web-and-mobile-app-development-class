import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons'

import "./index.css"


let Post = ({ profilePhoto, name, postDate, postText, postImage }) => (
    <div className='post'>
        <div className='postHeader'>
            <img className='profilePhoto' src={profilePhoto} alt="profile" />
            <div>
                {name} <br />
                {moment(postDate).fromNow()}
            </div>
        </div>

        <div className='postText'>
            {postText}
        </div>

        <img className='postImage' src={postImage} alt="post" />

        <hr />
        <div className='postFooter'>
            <div> <FontAwesomeIcon icon={faThumbsUp} /> like </div>
            <div> <FontAwesomeIcon icon={faComment} /> comment</div>
            <div> <FontAwesomeIcon icon={faShare} /> share</div>
        </div>
        <hr />

    </div>
);

export default Post