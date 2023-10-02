#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
const char* ssid = "your wifi ssid";
const char* password = "your wifi password";
const char* apiEndpoint = "your api endpoint";


void setup() {
  Serial.begin(9600);
  Serial.println(F("DHTxx test!"));

  dht.begin();

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao Wi-Fi...");
  }
  Serial.println("Conectado ao Wi-Fi");
  
}

void loop() {
  // Wait a few seconds between measurements.
  delay(2000);

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  HTTPClient http;

  // Crie um objeto JSON para enviar os dados
  StaticJsonDocument<200> jsonDocument;
  jsonDocument["temperature"] = t;
  jsonDocument["humidity"] = h;

  // Serializar o JSON para uma string
  String jsonString;
  serializeJson(jsonDocument, jsonString);
  
  // Configurar o cabeçalho e enviar a solicitação POST
  http.begin(apiEndpoint);
  http.addHeader("Content-Type", "application/json");

  int httpCode = http.POST(jsonString);

  // Verifique o código de resposta HTTP
  if (httpCode > 0) {
    Serial.println("Código de resposta HTTP: " + String(httpCode));
    String resposta = http.getString();
    Serial.println("Resposta do servidor: " + resposta);
  } else {
    Serial.println("Falha na solicitação HTTP");
  }

  http.end();
}
