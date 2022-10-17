import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const Hi = () => (
  <div className="container">
    <div className="name-div">
      <span className="name">Asharib Ali</span>
      <span className="profession">Web Developer</span>
    </div>

    <div className="left-div">
      <div className="info-box">
        <p className="heading">Contacts</p>
        <p>
          <span className="bold-span">Phone:</span>03161109240
        </p>
        <p>
          <span className="bold-span">Email:</span>asharib920@gmail.com
        </p>
        <p>
          <span className="bold-span">Address:</span>Karachi, Pakistan
        </p>
      </div>
    </div>

    <div className="right-div">
      <p className="heading">About Me</p>
      <p>
        I'm a Junior Web developer, improving my skills by doing Web and App
        development course at Saylani Institute.
      </p>
      <p className="heading">Education</p>
      <ul>
        <li>Matriculation from R.R.B.K Public School</li>
        <li>Intermediate from D.J Sindh Government Science College</li>
        <li>Undergradute in PAF-KIET</li>
      </ul>
      <p className="heading">Experience</p>
      <ul>
        <li>No Professional experience yet.</li>
      </ul>
      <p className="heading">Skills</p>
      <ul>
        <li>UI Designer</li>
        <li>Can make interactive website</li>
        <li>Have command on HTML, CSS and JS</li>
      </ul>
    </div>
  </div>
);




const Post = ({ title, text, image }) => (
  <div className="post">

    <h1> {title} </h1>
    <p> {text} </p>
    <img src={image} alt="placeholder" />

  </div>
)


const Page = () => (
  <div>
    I am a page component
    <Post
      title="Film fare update"
      text="The Filmfare Awards are recognised as India’s foremost awards and one of the oldest awards for Bollywood movies, presented on a yearly basis by The Times Group. Originally named the Clare Awards after The Times of India film critic Clare Mendonca. The first event held on March 21, 1954 gave out only five awards. Best Film Award was won by Do Bigha Zameen (1953), which also won its director Bimal Roy the Best Director Award. Dilip Kumar won for his acting in Daag (1952) while Meena Kumari won Best Actor (Female) for Baiju Bawra (1952). Naushad Ali’s music for Baiju Bawra won him the Best Music Director Award. These winners were selected by polling readers of the Filmfare magazine."
      image="https://resize.indiatvnews.com/en/resize/newbucket/715_-/2020/02/filmfare-1580695655.jpg"
    />
    <Post
      title="Winning the Best Music Director Award"
      text="The Filmfare Awards are recognised as India’s foremost awards and one of the oldest awards for Bollywood movies, presented on a yearly basis by The Times Group. Originally named the Clare Awards after The Times of India film critic Clare Mendonca. The first event held on March 21, 1954 gave out only five awards. Best Film Award was won by Do Bigha Zameen (1953), which also won its director Bimal Roy the Best Director Award. Dilip Kumar won for his acting in Daag (1952) while Meena Kumari won Best Actor (Female) for Baiju Bawra (1952). Naushad Ali’s music for Baiju Bawra won him the Best Music Director Award. These winners were selected by polling readers of the Filmfare magazine."
      image="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
    />
    <Post
      title="best drama Awards"
      text="The Filmfare Awards are recognised as India’s foremost awards and one of the oldest awards for Bollywood movies, presented on a yearly basis by The Times Group. Originally named the Clare Awards after The Times of India film critic Clare Mendonca. The first event held on March 21, 1954 gave out only five awards. Best Film Award was won by Do Bigha Zameen (1953), which also won its director Bimal Roy the Best Director Award. Dilip Kumar won for his acting in Daag (1952) while Meena Kumari won Best Actor (Female) for Baiju Bawra (1952). Naushad Ali’s music for Baiju Bawra won him the Best Music Director Award. These winners were selected by polling readers of the Filmfare magazine."
      image="https://images.squarespace-cdn.com/content/v1/5b398fb2f793925040070b55/1569358740365-XHKY3VFY8H86Q130T9MP/performers+on+stage?format=1000w"
    />
  </div>
)


ReactDOM.render(<Page />, document.querySelector("#root"));
