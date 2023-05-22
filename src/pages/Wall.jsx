import { useState, useEffect } from 'react';
import { getVideoResources, getAudioResources, getImageResources } from '../api/resources'; // assuming you have implemented API calls to get the resources

function WallPage() {
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Get video resources and set the state
    getVideoResources()
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Get audio resources and set the state
    getAudioResources()
      .then((response) => {
        setAudios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Get image resources and set the state
    getImageResources()
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-lg font-semibold">Videos</h1>
        {videos.map((video) => (
          <div key={video.id} className="flex space-x-4">
            <div className="w-1/4">
              <video controls className="w-full">
                <source src={video.url} type="video/mp4" />
              </video>
            </div>
            <div className="w-3/4">
              <h2 className="text-lg font-medium">{video.title}</h2>
              <p>{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-2">
        <h1 className="text-lg font-semibold">Audios</h1>
        {audios.map((audio) => (
          <div key={audio.id} className="flex space-x-4">
            <div className="w-1/4">
              <audio controls className="w-full">
                <source src={audio.url} type="audio/mpeg" />
              </audio>
            </div>
            <div className="w-3/4">
              <h2 className="text-lg font-medium">{audio.title}</h2>
              <p>{audio.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-2">
        <h1 className="text-lg font-semibold">Images</h1>
        {images.map((image) => (
          <div key={image.id} className="flex space-x-4">
            <div className="w-1/4">
              <img src={image.url} alt={image.title} className="w-full object-cover" />
            </div>
            <div className="w-3/4">
              <h2 className="text-lg font-medium">{image.title}</h2>
              <p>{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WallPage;
