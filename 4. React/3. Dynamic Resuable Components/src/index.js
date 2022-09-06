import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import busImage from "./img/bus.jpg";

// let student = {
//   name: "malik",
//   subject: "science",
//   roll: "001"
// }

// // let stdName = student.name
// // let stdSubject = student.subject
// // let stdRoll = student.roll

// let { name, subject, roll } = student;


// function Hi({ name, color, width }) {
//   return <div>Hello {name}! {color} {width}</div>;
// }

// const Hi = function({ name, color, width }) {
//   return <div>Hello {name}! {color} {width}</div>;
// }

const Hi = ({ name, color, width }) => (
  <div>
    Hello {name}! {color} {width}
  </div>
);

const MediaCard = ({ title, body, imageUrl }) => (
  <div className='mediaCard'>
    <h2>
      {title}
    </h2>
    <p>
      {body}
    </p>
    <img width={300} src={imageUrl} alt="" />
  </div>
)

const MediaPage = () => (
  <>
    <MediaCard
      title="The Bus"
      body="Bus is a very good medium of transport"
      imageUrl="https://en.higer.com/uploadfiles/2021/01/20210112151442503.png?NjkzOERGLnBuZw=="
    />
    <MediaCard
      title="The Car"
      body="Car is the expensive way to commute"
      imageUrl="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2019-honda-civic-sedan-1558453497.jpg?crop=1xw:0.9997727789138833xh;center,top&resize=480:*"
    />
    <MediaCard
      title="The Walk"
      body="Walk is the best exercise ever"
      imageUrl="https://post.healthline.com/wp-content/uploads/2022/06/female-walking-dog-1200x628-facebook-1200x628.jpg"
    />
  </>
)


ReactDOM.render(<MediaPage />, document.querySelector('#root'));