import React, { useState} from "react";


const ZoomLinkGenerator = () => {
  const [topic, setTopic] = useState("");
  // const [userId, setUserId] = useState("");
  const [link, setLink] = useState("");
  const[id,setId] = useState("");
  const[password,setPassword] = useState("");

  const generateZoomLink = async () => {
    try {
      const response = await fetch(`http://localhost:5000/generateZoomLink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic,
          userId: 'malvirinkal19@gmail.com',
        }),
      });
      const data = await response.json();
      console.log("data",data);
      setLink(data.joinUrl);
      setId(data.meetingId); // Set the meeting ID to the state variable
      setPassword(data.password);

    } catch (error) {
      console.error(error);
    }
    
  };

  
  

  return (
    <div>
      <input
        type="text"
        placeholder="Topic"
        value={topic}
        required
        onChange={e => setTopic(e.target.value)}
      />
      {/* <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={e => setUserId(e.target.value)}
      /> */}
     
     <button  onClick={() => generateZoomLink()}>Generate Link</button> <br/>
       {link.length !== 0 && <a href={link}>zoom-link</a>   }
       {/* {id &&   <p>Meeting ID: {id}</p>}
       {password && <p>Password: {password}</p>}  */}

       {id && password && link &&
        <form >
          <label>Meeting ID</label>
      <textarea name="meeting id" defaultValue={id} />
      
          {/* <label>
            Meeting ID:
            <input type="text" defaultValue={id} name="user_mid" />
          </label> */}
          <br />
          <label>Password</label>
      <textarea name="password" defaultValue={password} />

          {/* <label>
            Password:
            <input type="text" defaultValue={password} name="user_password"  />
          </label> */}
          <br />
          <label>Meeting Link</label>
      <textarea name="link" defaultValue={link} />


          {/* <label>
            Link:
            <input type="text" defaultValue={link}  name="user_link"/>
          </label> */}
          <br />
          <label>Email</label>
      <input type="email" name="user_email" />
         <br />
     

        </form>
       }

      </div>
  );
};

export default ZoomLinkGenerator;
       