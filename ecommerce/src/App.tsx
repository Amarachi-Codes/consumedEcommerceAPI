import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { MantineProvider } from '@mantine/core';

interface Items {
  id: number
  title: string
  price: string
  category: string
  description: string
  image: string
}

function App() {
  const [items, setItems] = useState<Items[]>([])
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://fakestoreapi.com/products'
        // "https://fakestoreapi.com/products?limit=5"
      );
      const responseData: Items[] = response.data;
      setItems(responseData)
    } catch (error) {
      console.log(`Error fetching Data: ${error}`);

    }
  }

  const handleDelete = (id: number) => {
    alert("user with: " + id + " deleted succesfully");
  }
  return (
    <>
      <MantineProvider>


        <div className='center'> <h1>Ecommerce store</h1></div>
        <div className='table'>
          {items.map((item) => (


            <Card shadow="sm" padding="lg" radius="md" withBorder className='card' key={item.id}>
              <Card.Section>

                <Image
                  src={item.image}
                  height={160}
                  alt="Norway"
                  className='apiimage'
                />
              </Card.Section>
              <div>
                <Button color="blue" fullWidth mt="md" radius="md">
                  {item.category}
                </Button>
              </div>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{item.title}</Text>
                <Badge color="pink">${item.price}</Badge>
              </Group>

              <Text size="sm" c="dimmed">
                {item.description}
              </Text>


              <div><button className='delete' onClick={() => { handleDelete(item.id) }}>Delete</button></div>
            </Card>

          ))}
        </div>
      </MantineProvider>
    </>
  )
}

export default App
