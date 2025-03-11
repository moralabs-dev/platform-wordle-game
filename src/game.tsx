import { Container, Box, TextInput, Button, Grid, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import words from "../words.json";

export default function Game() {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setTargetWord(words[randomIndex]);
  }, []);

  const getLetterColor = (letter: string, index: number, word: string) => {
    if (!letter) return "white";
    if (letter === targetWord[index]) {
      return "#4caf50";
    } else if (targetWord.includes(letter)) {
      return "#ffeb3b";
    }
    return "#ff4444";
  };

  const handleGuess = () => {
    if (guess.length === 5) {
      setGuesses([...guesses, guess.toUpperCase()]);
      setGuess("");

      if (guess.toUpperCase() === targetWord || guesses.length === 5) {
        setTimeout(() => {
          alert(
            guess.toUpperCase() === targetWord
              ? "Tebrikler! Kelimeyi buldunuz!"
              : `Oyun bitti! Doğru kelime: ${targetWord}`
          );

          setGuesses([]);
          const randomIndex = Math.floor(Math.random() * words.length);
          setTargetWord(words[randomIndex]);
        }, 500);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGuess();
    }
  };

  return (
    <Container size="xs" mt={50}>
      <Text ta="center" fz="xl" fw={700} mb={30}>
        WORDLE
      </Text>

      <Grid>
        {[...Array(6)].map((_, rowIndex) => (
          <Grid.Col span={12} key={rowIndex}>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "5px",
                marginBottom: "5px",
              }}
            >
              {[...Array(5)].map((_, colIndex) => (
                <Box
                  key={colIndex}
                  style={{
                    width: "50px",
                    height: "50px",
                    border: "2px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    backgroundColor: guesses[rowIndex]
                      ? getLetterColor(
                          guesses[rowIndex][colIndex],
                          colIndex,
                          guesses[rowIndex]
                        )
                      : "white",
                    color: guesses[rowIndex] ? "white" : "black",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  {guesses[rowIndex]?.[colIndex] || ""}
                </Box>
              ))}
            </Box>
          </Grid.Col>
        ))}
      </Grid>

      <Box
        mt={30}
        style={{ display: "flex", gap: "10px", justifyContent: "center" }}
      >
        <TextInput
          value={guess}
          onChange={(e) => setGuess(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          maxLength={5}
          placeholder="Tahmin et..."
          style={{ width: "200px" }}
        />
        <Button onClick={handleGuess}>Tahmin Et</Button>
      </Box>
    </Container>
  );
}
