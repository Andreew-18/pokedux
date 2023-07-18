
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useDispatch } from "react-redux";
import { setFavorite } from "../actions";
import StarButton from "./StarButton";

const PokemonCard = ({name,key,image,type,id}) => {
  const dispatch = useDispatch();
  const typeString = type.map(elem => elem.type.name).join(', ');

  const handleOnFavorite = () => {
   dispatch(setFavorite({ pokemondId : id }));
  };


  return (
    <Card
    style={{width:250}}
    key={key}
      title={name}
      cover={<img src={image} alt={name}/>}
      extra={<StarButton isFavorite onClick={handleOnFavorite} />}
    >
      <Meta description={typeString} />
    </Card>
  );
};

export default PokemonCard;
