import morning from "../assets/morning.jpg";
import sunset from "../assets/sunset.jpg";
import midnight from "../assets/midnight.jpg";

export default function getBackgroundImage(hour) {
  if (hour >= 24) hour -= 24;
  if (hour < 0) hour += 24;

  if (hour >= 6 && hour < 17) {
    return morning;
  } else if (hour >= 17 && hour < 20) {
    return sunset;
  } else {
    return midnight;
  }
}
