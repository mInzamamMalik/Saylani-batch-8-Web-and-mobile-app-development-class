import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons'


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


function Page() {
  return <div className='page'>

    <Post
      name="Arsalan"
      profilePhoto="https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2016/02/Headshot-Photography-London-0997.jpg?ssl=1"
      postDate="12 Dec 2021"
      postImage="https://external.fkhi22-1.fna.fbcdn.net/emg1/v/t13/16124961730157314991?url=https%3A%2F%2Fnextjs.org%2Fapi%2Fconf-ticket-oct22%3Fusername%3DmInzamamMalik%26name%3DInzamam%2BMalik%26ticketNumber%3D32482%26ticketTheme%3Db&fb_obo=1&utld=nextjs.org&stp=c0.5000x0.5000f_dst-jpg_flffffff_p1000x522_q75&ccb=13-1&oh=06_AaoVoBROaunA_oCFI92_4jGYlh7HYRkLHcLa_6irKKPTFw&oe=63213313&_nc_sid=7ca135"
    />
    <Post
      name="Malik"
      profilePhoto="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3pZsFVy-qhDZpps34-E8Ob3ga0eSTxAVlAw&usqp=CAU"
      postDate="12 Dec 2021"
      postImage="https://scontent.fkhi22-1.fna.fbcdn.net/v/t39.30808-6/305959254_607893674109469_4134871844598912073_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=URSzx0vTsHIAX-2sr6m&tn=hfZSPM7bVGpTnnQl&_nc_ht=scontent.fkhi22-1.fna&oh=00_AT815uKGbvnxRj_OoA_wZusVGNy6PnHZ4ugdB23hcfzbIA&oe=63249775"
      postText="The guides area is designed to help developers learn to better interact with the date and time problem domain, and the Moment.js library.
We address our most frequently seen support requests here, so it is a great place to check for solutions to any issues you may have."
    />
    <Post
      name="Rehan"
      profilePhoto="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQndLs1UQJYZoZ7kTX671WnLbVYfjiphBIKUA&usqp=CAU"
      postDate="22 Aug 2022"
      postImage="https://scontent.fkhi22-1.fna.fbcdn.net/v/t39.30808-6/299432900_587372422828261_1415608103552511230_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=oknEgf13A6oAX-babEl&_nc_ht=scontent.fkhi22-1.fna&oh=00_AT_lbsv5lAVLoOqs34w-WIyaSmkfhAFxomKhEWnjMtNXEg&oe=632532F2"
      postText="The guides area is designed to help developers learn to better interact with the date and time problem domain, and the Moment.js library.
We address our most frequently seen support requests here, so it is a great place to check for solutions to any issues you may have."
    />
    <Post
      name="Saylani"
      profilePhoto="https://media.istockphoto.com/photos/happy-indian-business-man-leader-manager-standing-in-office-headshot-picture-id1350800599?b=1&k=20&m=1350800599&s=170667a&w=0&h=LDmNXp5GzpzVB2FwIsV4iTAnqLJRQ5jGCE825aRXHQQ="
      postDate="12 Dec 2021"
      postImage="https://scontent.fkhi22-1.fna.fbcdn.net/v/t39.30808-6/305959254_607893674109469_4134871844598912073_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=URSzx0vTsHIAX-2sr6m&tn=hfZSPM7bVGpTnnQl&_nc_ht=scontent.fkhi22-1.fna&oh=00_AT815uKGbvnxRj_OoA_wZusVGNy6PnHZ4ugdB23hcfzbIA&oe=63249775"
      postText="The guides area is designed to help developers learn to better interact with the date and time problem domain, and the Moment.js library.
We address our most frequently seen support requests here, so it is a great place to check for solutions to any issues you may have."
    />


  </div>
}


ReactDOM.render(<Page />, document.querySelector('#root'));