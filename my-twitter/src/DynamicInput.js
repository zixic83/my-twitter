import React, { useEffect,forwardRef } from "react";

const DynamicInput = forwardRef((tweetPhotos, setTweetPhotos) =>{


  const handleAdd = () => {
    const newInput = [...tweetPhotos, []];
    setTweetPhotos(newInput);
    };
    
    const handleChange = (e,i) => {
        const inputData = [...tweetPhotos]
        inputData[i] = e.target.value;
        setTweetPhotos(inputData);
    }

    const handleDelete = (i) => {
        const inputData = [...tweetPhotos];
        inputData.splice(i, 1);
        setTweetPhotos(inputData);
    }
  console.log(tweetPhotos)


  return (
    <>
      <button onClick={() => handleAdd()}>Add</button>
          {tweetPhotos.map((photo, i) => {
              return (
                  <div>
                      <input onChange={e => handleChange(e, i)} />
                      <button onClick={()=>handleDelete(i)}>x</button>
                  </div>
              )
          })}
    </>
  );
})

export default DynamicInput;
