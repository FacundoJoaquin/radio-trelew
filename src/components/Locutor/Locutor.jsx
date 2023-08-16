import { useEffect, useState } from "react";
import radiotw from "../../assets/radiotw.png";
import "./locutor.css";
import diegoCastro from "../../assets/diegoCastro.png";
import fondoMitre from "../../assets/fondoMitre.jpg";
import la17 from "../../assets/la17.png"

const Locutor = () => {
  const [currentDay, setCurrentDay] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [imageToShow, setImageToShow] = useState("");
  const [titleToShow, setTitleToShow] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const daysOfWeek = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const dayOfWeekName = daysOfWeek[currentTime.getDay()];
    setCurrentDay(dayOfWeekName);
  }, [currentTime, currentDay]);

  useEffect(() => {
    const currentHour = currentTime.getHours();

    if (currentDay && currentDay !== "Sábado" && currentDay !== "Domingo") {
      switch (true) {
        case currentHour >= 16 && currentHour < 18:
          setImageToShow(diegoCastro);
          setTitleToShow("TODO PASA");
          break;
        default:
          setImageToShow(fondoMitre); //FALTA ASSET DE RADIO MITRE
          setTitleToShow("RADIO MITRE");
          break;
      }
    } else if (currentDay === "Sábado") {
      switch (true) {
        case currentHour >= 9 && currentHour < 13:
          setImageToShow(diegoCastro);
          setTitleToShow("LA GRAN MAÑANA");
          break;
        case currentHour >= 13 && currentHour < 14:
          setImageToShow(la17); //VA RAUL PASARIN, NO ESTA SU FOTO
          setTitleToShow("LA VOZ DE LA MESETA");
          break;
        default:
          setImageToShow(fondoMitre); //FALTA ASSET DE RADIO MITRE
          setTitleToShow("RADIO MITRE");
          break;
      }
    } else if (currentDay === "Domingo") {
      switch (true) {
        default:
          setImageToShow(fondoMitre); //FALTA ASSET DE RADIO MITRE
          setTitleToShow("RADIO MITRE");
          break;
      }
    }
  }, [currentTime, currentDay]);

  return (
    <div className="locutor-container">
      <div className="radio-programa">
        <img src={radiotw} alt="" />
        <h2>{titleToShow}</h2>
      </div>
      <img
        src={imageToShow}
        className={`locutor-img ${imageToShow.includes("la17Parche") ? 'special-width' : ''}`}
        alt="locutor"
        style={{
          width:
            imageToShow.includes("fondoMitre")
              ? "100%"
              : "auto",
          objectFit: "cover",
          height:
            imageToShow.includes("fondoMitre")
            ? "85%" 
            : "auto",
        }}
      />    </div>
  );
};

export default Locutor;
