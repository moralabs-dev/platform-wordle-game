import { Container, Table, Text, Button, Box, Card, Stack, Center, Paper, rem } from "@mantine/core";
import { Link } from "react-router-dom";

// Statik liderlik tablosu verileri
const leaderboardData = [
    { rank: 1, name: "Kelime Ustası", score: 1800 },
    { rank: 2, name: "Hızlı Düşünen", score: 1600 },
    { rank: 3, name: "Sözlük Kralı", score: 1400 },
    { rank: 4, name: "Zihin Avcısı", score: 1200 },
    { rank: 5, name: "Türkçe Şahini", score: 1100 },
];

export function Leaderboard() {
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
                        🏆 Liderlik Tablosu
                    </Text>

                    <Paper withBorder shadow="xs" p={0} style={{ width: "100%", overflow: "hidden" }}>
                        <Table
                            highlightOnHover
                            withColumnBorders
                            withTableBorder
                            verticalSpacing="sm"
                            horizontalSpacing="xs" // Reduced horizontal spacing
                            style={{ width: "100%" }}
                        >
                            <Table.Thead>
                                <Table.Tr style={{ backgroundColor: "#f8f9fa" }}>
                                    <Table.Th
                                        style={{
                                            textAlign: "center",
                                            fontSize: "1.1rem",
                                            padding: "15px 10px",
                                        }}
                                    >
                                        Sıra
                                    </Table.Th>
                                    <Table.Th
                                        style={{
                                            textAlign: "center",
                                            fontSize: "1.1rem",
                                            padding: "10px 10px", // Reduced padding
                                        }}
                                    >
                                        Oyuncu
                                    </Table.Th>
                                    <Table.Th
                                        style={{
                                            textAlign: "center",
                                            fontSize: "1.1rem",
                                            padding: "10px 10px", // Reduced padding
                                        }}
                                    >
                                        Puan
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {leaderboardData.map((player) => (
                                    <Table.Tr key={player.rank}>
                                        <Table.Td
                                            style={{
                                                textAlign: "center",
                                                fontWeight: "bold",
                                                padding: "8px 8px", // Reduced padding
                                            }}
                                        >
                                            {player.rank <= 3 ? (
                                                <Text
                                                    size="lg"
                                                    fw={700}
                                                    c={
                                                        player.rank === 1
                                                            ? "gold"
                                                            : player.rank === 2
                                                            ? "gray"
                                                            : "orange"
                                                    }
                                                >
                                                    {player.rank === 1
                                                        ? "🥇"
                                                        : player.rank === 2
                                                        ? "🥈"
                                                        : "🥉"}
                                                    {" "}
                                                    {player.rank}
                                                </Text>
                                            ) : (
                                                player.rank
                                            )}
                                        </Table.Td>
                                        <Table.Td 
                                            style={{ 
                                                textAlign: "center",
                                                padding: "12px 10px", // Reduced padding
                                                fontWeight: 500
                                            }}
                                        >
                                            {player.name}
                                        </Table.Td>
                                        <Table.Td
                                            style={{
                                                textAlign: "center",
                                                fontWeight: "bold",
                                                padding: "12px 10px", // Reduced padding
                                                color: "#228be6"
                                            }}
                                        >
                                            {player.score}
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Paper>

                    {/* Properly centered button with box to ensure it's centered */}
                    <Box style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 20 }}>
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