# Sensor de temperatura e humidade com placa ESP32
![Gerador de senhas (1)](https://github.com/JaianeOliveira/esp-node-server/assets/82323559/4ddc97aa-b1b8-47c1-bf75-3eb41ce80093)

![WhatsApp Image 2023-10-03 at 10 27 11](https://github.com/JaianeOliveira/esp-node-server/assets/82323559/1c1f28cf-45ac-4d5f-9410-8b67012dd948)

## Descrição do projeto

- A atividade consiste em criar uma estação meteorológica usando o ESP32 que colete dados de temperatura e umidade, exibindo-os em uma página WEB.

## Componentes necessários
- ESP32
- Sensor DHT11
- Protoboard
- Jumpers
- Cabo Micro USB
- Computador com Arduino IDE instalada

## Software utilizado
Segue a lista de pacotes instalados para o funcionamento do ESP32 (não sabemos quais são realmente necessários):
- ESP-IDF (que pode ser instalada seguindo o [tutorial do Kauã](https://docs.google.com/document/d/1p9fvjjZdeZ6iR5S5DZYtAWT7Cs0nL548-sQffM2ogDk/edit?usp=drive_web&authuser=1))
- [Driver CP210x](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers) (Em alguns computadores, o ESP32 não é reconhecido quando conectado. Em nossos testes, o driver CP210x resolveu o problema)
- [Espressif Arduino Core](https://espressif.github.io/arduino-esp32/package_esp32_index.json) (Instala o suporte ao ESP32 na IDE do Arduino e algumas bibliotecas úteis)

Os seguintes são bibliotecas necessárias para a utilização do código arduino utilizado:
- DHT sensor library (Biblioteca para o sensor DHT11 que pode ser instalada na IDE do Arduino)
- Adafruit Unified Sensor (Dependência da biblioteca do sensor DHT11 que pode ser instalada na IDE do Arduino)
- ArduinoJson (Biblioteca para manipulação de JSON que pode ser instalada na IDE do Arduino)


## Diário de bordo

#### 14/09/2023 - Instalação do ambiente de desenvolvimento
- Começamos instalando a IDE e os pacotes necessários para o desenvolvimento do trabalho.
- Antes de começar o real trabalho, fizemos um projeto mais simples para nos familiarizarmos com a IDE e o ESP32.
- O projeto consistia em controlar um LED via Bluetooth.
- Finalizamos o projeto e o testamos com sucesso.

#### 19/09/2023 - Início do trabalho
- Começamos de fato o trabalho com o sensor DHT11.
- No entanto, tivemos problemas em fazer o sensor funcionar com o ESP32.
- Recebemos permissão da professora para testar o equipamento em casa.
- Um dos membros da equipe testou o sensor em casa, e apesar do código compilar, não foi possível extrair qualquer informação do sensor.

#### 20/09/2023 - Teste do sensor DHT11
- Passamos então o equipamento para outro membro da equipe, que testou o sensor em casa.
- Apesar do sensor esquentar, não foi possível extrair qualquer informação, recebendo do código um print que indicava que o sensor não foi detectado pelo ESP32.

#### 21/09/2023 - Teste do sensor DHT11
- Retornamos aos testes em sala de aula.
- Mais uma vez, o sensor não foi detectado pelo ESP32.
- No entanto, uma das equipes conseguiu fazer o sensor funcionar com os jumpers conectados de forma diferente da nossa.
- Tentamos reproduzir o resultado, mas sem sucesso.
- Mais uma vez, a professora autorizou a equipe a testar o sensor em casa.
- Um dos membros da equipe conseguiu fazer o sensor funcionar em casa, com a mesma configuração utilizada pela equipe descrita acima.
- Com o sensor funcionando, começamos a trabalhar no código para extrair as informações do sensor.

#### 26/09/2023 - Teste do sensor DHT11
- Retornamos aos testes em sala de aula que ocorreram de forma tranquila após o teste anterior.
- Mais uma vez, com a autorização da professora, levamos o equipamento para casa.
