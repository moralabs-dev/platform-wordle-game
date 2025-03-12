import { Container, Card, Text, Button, Box, Paper, Stack, Image, Badge, Group, Center } from "@mantine/core";
import { Link } from "react-router-dom";
import { useState } from "react";

// Using actual avatar images from assets folder
const yellowAvatarUrl = new URL('../assets/yellowbackgroundavatar.png', import.meta.url).href;
const blueAvatarUrl = new URL('../assets/bluebackgroundavatar.png', import.meta.url).href;
const greyAvatarUrl = new URL('../assets/greybackgroundavatar.png', import.meta.url).href;


// Shop items with actual avatar images
const shopItems = [
    {
        id: 1,
        name: "Sarı Avatar",
        price: 500,
        description: "Güneş gibi parlayan sarı bir avatar ile diğer oyuncuların arasından sıyrılın",
        img: yellowAvatarUrl,
        color: "yellow"
    },
    {
        id: 2,
        name: "Mavi Avatar",
        price: 300,
        description: "Sakin ve güven veren mavi bir avatar ile tarzınızı gösterin",
        img: blueAvatarUrl,
        color: "blue"
    },
    {
        id: 3,
        name: "Gri Avatar",
        price: 700,
        description: "Profesyonel ve şık bir görünüm için minimal gri avatar",
        img: greyAvatarUrl,
        color: "gray"
    },
];

export function Shop() {
    const [ownedItems, setOwnedItems] = useState<number[]>([]);

    const handleBuy = (itemId: number) => {
        setOwnedItems((prev) => [...prev, itemId]);
        alert("Satın alma başarılı!");
    };

    return (
        <Container size="md" mt={50} px={20}>
            <Card shadow="md" padding="xl" radius="md" withBorder>
                <Stack align="center">
                    <Text
                        ta="center"
                        fz={28}
                        fw={700}
                        mb={20}
                        style={{ 
                            fontFamily: "Open Sans, sans-serif",
                            width: "100%",
                            padding: "10px 0",
                            borderBottom: "2px solid #e9ecef"
                        }}
                    >
                        🎭 Avatar Mağazası
                    </Text>

                    <Text c="dimmed" mb={20} ta="center" mx="auto" style={{ maxWidth: "600px" }}>
                        Özel avatarlar satın alarak Wordle liderlik tablonuzda kendinizi gösterin!
                    </Text>

                    <Paper withBorder radius="md" p="xl" style={{ width: "100%" }}>
                        {/* Fixed layout with proper centering */}
                        <Box style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "20px" }}>
                            {shopItems.map((item) => (
                                <Card 
                                    key={item.id} 
                                    shadow="sm" 
                                    padding="lg" 
                                    radius="md" 
                                    withBorder
                                    style={{ 
                                        position: "relative",
                                        width: "calc(33% - 14px)",
                                        maxWidth: "280px",
                                        display: "flex",
                                        flexDirection: "column",
                                        transition: "transform 0.2s, box-shadow 0.2s",
                                    }}
                                >
                                    <Card.Section>
                                        <Box style={{ position: "relative" }}>
                                            <Badge
                                                color={item.color}
                                                size="lg"
                                                style={{
                                                    position: "absolute",
                                                    top: 10,
                                                    right: 10,
                                                    zIndex: 2
                                                }}
                                            >
                                                {item.price} Puan
                                            </Badge>
                                            {/* Improved centering for the avatar image */}
                                            <Box
                                                style={{
                                                    padding: "20px 0",
                                                    backgroundColor: "#f8f9fa",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    width: "100%"
                                                }}
                                            >
                                                <Image
                                                    src={item.img}
                                                    height={160}
                                                    width={160}
                                                    alt={item.name}
                                                    fit="contain"
                                                    style={{ 
                                                        borderRadius: "50%",
                                                        margin: "0 auto" // Center the image horizontally
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </Card.Section>

                                    <Stack mt="md" align="center" style={{ flexGrow: 1, justifyContent: "space-between" }}>
                                        <Box style={{ width: "100%" }}>
                                            <Text fw={700} fz="lg" ta="center">
                                                {item.name}
                                            </Text>
                                            <Text fz="sm" c="dimmed" ta="center" mt={8}>
                                                {item.description}
                                            </Text>
                                        </Box>
                                        
                                        {/* Improved button centering with extra spacing */}
                                        <Box style={{ 
                                            width: "100%", 
                                            display: "flex", 
                                            justifyContent: "center", 
                                            alignItems: "center",
                                            marginTop: 24, // Added more space above button
                                        }}>
                                            <Button
                                                color={ownedItems.includes(item.id) ? "green" : item.color}
                                                onClick={() => handleBuy(item.id)}
                                                disabled={ownedItems.includes(item.id)}
                                                size="md"
                                                fullWidth
                                                mx="auto"
                                                style={{ 
                                                    width: "100%",
                                                    maxWidth: "200px"
                                                }}
                                            >
                                                {ownedItems.includes(item.id) ? "✓ Satın Alındı" : "Satın Al"}
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Card>
                            ))}
                        </Box>
                    </Paper>

                    <Box style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 30 }}>
                        <Button
                            component={Link}
                            to="/"
                            variant="light"
                            color="blue"
                            radius="md"
                            size="md"
                            style={{ padding: "10px 30px" }}
                        >
                            🎮 Oyuna Geri Dön
                        </Button>
                    </Box>
                </Stack>
            </Card>
        </Container>
    );
}