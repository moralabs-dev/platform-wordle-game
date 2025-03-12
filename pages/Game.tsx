import { Container, Box, TextInput, Button, Grid, Text, Group, Paper, Title, Card, ActionIcon, Divider, Center } from "@mantine/core";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import words from "../words.json";

export default function Game() {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setTargetWord(words[randomIndex]);
  }, []);

  const getLetterColor = (letter: string, index: number, word: string) => {
    if (!letter) return "transparent";
    if (letter === targetWord[index]) {
      return "#4caf50"; // Green for correct position
    } else if (targetWord.includes(letter)) {
      return "#ffeb3b"; // Yellow for present but wrong position
    }
    return "#ff4444"; // Red for incorrect letter
  };

  const handleGuess = () => {
    if (guess.length === 5) {
      const newGuesses = [...guesses, guess.toUpperCase()];
      setGuesses(newGuesses);
      setGuess("");

      // Check for win/lose condition
      if (guess.toUpperCase() === targetWord) {
        setGameStatus("won");
        setTimeout(() => {
          alert("Tebrikler! Kelimeyi buldunuz!");
          resetGame();
        }, 500);
      } else if (newGuesses.length === 6) {
        setGameStatus("lost");
        setTimeout(() => {
          alert(`Oyun bitti! Doğru kelime: ${targetWord}`);
          resetGame();
        }, 500);
      }
    }
  };

  const resetGame = () => {
    setGuesses([]);
    setGameStatus("playing");
    const randomIndex = Math.floor(Math.random() * words.length);
    setTargetWord(words[randomIndex]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGuess();
    }
  };

  return (
    <Container size="sm" mt={40} px={20}>
      {/* Game Header */}
      <Card shadow="md" radius="md" withBorder p="lg" mb={40}>
        <Card.Section withBorder inheritPadding py="xs">
          <Title order={1} ta="center" fw={800} style={{ 
            letterSpacing: "3px", 
            color: "#1a1b1e",
            fontFamily: "'Segoe UI', Arial, sans-serif"
          }}>
            WORDLE
          </Title>
        </Card.Section>

        {/* Navigation Links - FIXED CENTERING */}
        <Center mt={24} mb={20}>
          <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
            <Button 
              component={Link} 
              to="/leaderboard" 
              variant="light" 
              color="blue" 
              radius="md"
              leftSection={<span>🏆</span>}
              style={{ minWidth: "160px" }}
            >
              Liderlik Tablosu
            </Button>
            <Button 
              component={Link} 
              to="/shop" 
              variant="light" 
              color="violet" 
              radius="md"
              leftSection={<span>🛒</span>}
              style={{ minWidth: "160px" }}
            >
              Avatar Mağazası
            </Button>
          </div>
        </Center>
      </Card>
      
      {/* Game Board */}
      <Paper shadow="md" radius="md" withBorder p="xl" style={{ 
        backgroundColor: "#ffffff", 
        marginBottom: "30px" 
      }}>
        <Grid gutter={10}>
          {[...Array(6)].map((_, rowIndex) => (
            <Grid.Col span={12} key={rowIndex}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                {[...Array(5)].map((_, colIndex) => (
                  <Box
                    key={colIndex}
                    style={{
                      width: "60px",
                      height: "60px",
                      border: `2px solid ${guesses[rowIndex] ? "#e9ecef" : "#dee2e6"}`,
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      fontWeight: "bold",
                      backgroundColor: guesses[rowIndex]
                        ? getLetterColor(
                            guesses[rowIndex][colIndex],
                            colIndex,
                            guesses[rowIndex]
                          )
                        : "transparent",
                      color: guesses[rowIndex] ? "white" : "#343a40",
                      transition: "all 0.3s ease",
                      boxShadow: guesses[rowIndex] ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
                      transform: guesses[rowIndex] ? "scale(0.95)" : "scale(1)"
                    }}
                  >
                    {guesses[rowIndex]?.[colIndex] || ""}
                  </Box>
                ))}
              </Box>
            </Grid.Col>
          ))}
        </Grid>
      </Paper>

      {/* Input Area - PROPERLY CENTERED */}
      <Card shadow="sm" radius="md" withBorder p="md">
        <Center>
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            gap: "15px" 
          }}>
            <TextInput
              value={guess}
              onChange={(e) => setGuess(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              maxLength={5}
              placeholder="Tahmin et..."
              size="lg"
              radius="md"
              style={{ width: "200px" }}
              disabled={gameStatus !== "playing"}
            />
            <Button 
              onClick={handleGuess} 
              size="lg" 
              radius="md" 
              color="teal"
              disabled={guess.length !== 5 || gameStatus !== "playing"}
            >
              Tahmin Et
            </Button>
          </div>
        </Center>
        
        {gameStatus !== "playing" && (
          <Center mt="md">
            <Button 
              onClick={resetGame} 
              variant="light" 
              color="blue"
              size="md"
            >
              Yeni Oyun
            </Button>
          </Center>
        )}
      </Card>
      
      {/* Game Instructions */}
      <Card mt={30} p="xs" withBorder shadow="sm" radius="md">
        <Text size="sm" ta="center" c="dimmed" style={{ fontStyle: "italic" }}>
          5 harfli kelimeleri en fazla 6 denemede bulmaya çalışın. Doğru harf ve konumda yeşil, doğru harf yanlış konumda sarı olacaktır.
        </Text>
      </Card>
    </Container>
  );
}