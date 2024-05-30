import style from "./CharactersRoute.module.css";
import Character from "../types/Character";
import CharacterCard from "../components/CharacterCard";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectedCharacterId } from "../Store/Slices/CharacterSlice";
import axios from "axios";
import Footer from "../components/Footer"

const handleDeleteCharacterClicked = (
  event: React.MouseEvent<HTMLButtonElement>
) => {
  event.stopPropagation();

  //maybe disable on favorited characters
  //have some sort of confirmation

  console.warn("Not yet implemented");
};

const handleFavoriteCharacterClicked = (
  event: React.MouseEvent<HTMLButtonElement>
) => {
  event.stopPropagation();

  console.warn("Not yet implemented");
};

const getCharacters = async (): Promise<Character[] | undefined> => {
  try {
    const response = await axios.get(
      /* "http://localhost:5106/api/Character/GetCharacters" */
      /* `https://localhost:7110/api/Character/GetCharacters`  */
      /* `52.149.227.5:8081/api/Character/GetCharacters`, */
      `https://chasfantasy.azurewebsites.net/api/Character/GetCharacters`,
    );

    return await response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const CharactersRoute = () => {
  const navigate = useNavigate();

  const [characters, setCharacters] = useState<Character[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setCharacters((await getCharacters()) as Character[]);
    })();
  }, []);

  const handleCharacterClicked = (character: Character) => {
    //TODO: set selected character and move on to next route in flow
    console.log(character.id, "selected!");
    const id = character.id;
    dispatch(selectedCharacterId(id));

    navigate("/adventure", { replace: true });
  };

  return (
    <main>
      <h1>Your Characters</h1>
      <ul>
        {characters.map((character, index) => {
          return (
            <CharacterCard
              key={character.name + index}
              character={character}
              onDelete={handleDeleteCharacterClicked}
              onFavorite={handleFavoriteCharacterClicked}
              onSelect={handleCharacterClicked}
            />
          );
        })}
      </ul>
      <Link className={style.link} relative="path" to="new">
        New
      </Link>
      < Footer />
    </main>
  );
};
