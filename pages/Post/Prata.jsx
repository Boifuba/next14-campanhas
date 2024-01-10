import { useState, useEffect, useCallback } from "react";
import { PiCoinsDuotone } from "react-icons/pi";
import Image from "next/image";
import "./Prata.css";
import Share from "@/components/Share";
import Head from "next/head";
// import "../globals.css";

const url = `https://campanhasdoboi.com.br/rpg/Post/Prata`;

export default function Prata() {
  const [kilos, setKilos] = useState("");
  const [pounds, setPounds] = useState("");
  const [coins, setCoins] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const convertSilver = useCallback(() => {
    const silverPrice = 4;
    const silverWeightKilos = 0.0018;
    const silverWeightPounds = 0.004;

    let kilosResult = 0;
    let poundsResult = 0;
    let coinsResult = 0;
    let valueResult = 0;

    if (kilos) {
      kilosResult = parseFloat(kilos);
      poundsResult = kilosResult * 2.20462;
      coinsResult = kilosResult / silverWeightKilos;
      valueResult = coinsResult * silverPrice;
    } else if (pounds) {
      poundsResult = parseFloat(pounds);
      kilosResult = poundsResult / 2.20462;
      coinsResult = poundsResult / silverWeightPounds;
      valueResult = coinsResult * silverPrice;
    } else if (coins) {
      coinsResult = parseFloat(coins);
      kilosResult = coinsResult * silverWeightKilos;
      poundsResult = coinsResult * silverWeightPounds;
      valueResult = coinsResult * silverPrice;
    } else if (value) {
      valueResult = parseFloat(value);
      coinsResult = valueResult / silverPrice;
      kilosResult = coinsResult * silverWeightKilos;
      poundsResult = coinsResult * silverWeightPounds;
    }

    setResult(
      `Kilos: ${kilosResult.toFixed(2)}, Pounds: ${poundsResult.toFixed(
        2
      )}, Coins: ${coinsResult.toFixed(
        2
      )}, Value: $${valueResult.toLocaleString("en-US", {
        minimumFractionDigits: 0,
      })}`
    );
  }, [coins, kilos, pounds, value]);

  const handleInputChange = (inputName, inputValue) => {
    let formattedInputValue = inputValue;
    if (inputName === "kilos") {
      formattedInputValue = parseFloat(parseFloat(inputValue).toFixed(2));
    }
    setKilos(inputName === "kilos" ? formattedInputValue : "");
    setPounds(inputName === "pounds" ? inputValue : "");
    setCoins(inputName === "coins" ? inputValue : "");
    setValue(inputName === "value" ? inputValue : "");
    convertSilver();
  };
  return (
    <>
      <Head>
        <title>GURPS: Regra de Cavar Buraco</title>
        <link rel="icon" href="/rpg/boi.svg" />
        <meta name="description" content="Conversor de Prata para GURPS." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="Boifubá" />
        <meta name="keywords" content="GURPS, Converor de Prata" />
        <meta property="og:title" content="Conversor de Prata" />
        <meta
          property="og:description"
          content="Uma calculadora para calcular o peso da prata usando as regras de GURPS."
        />
        <meta
          property="og:url"
          content="https://campanhasdoboi.com.br/rpg/Post/Prata"
        />{" "}
        <h2>Compartilhe</h2>
        <meta
          property="og:image"
          content={"https://campanhasdoboi.com.br/rpg/silver.jpg"}
        />
        <meta name="theme-color" content="#ea4f4c"></meta>
        <meta name="twitter:title" content="Calculadora de Prata para GURPS" />
        <meta
          name="twitter:description"
          content="Uma calculadora para calcular o peso da prata usando as regras de GURPS."
        />
        <meta name="twitter:card" content="summary_large_image" />{" "}
        <meta
          name="twitter:image"
          content={"https://campanhasdoboi.com.br/rpg/silver.jpg"}
        />
        <meta
          name="description"
          content="Uma calculadora para calcular o peso da prata usando as regras de GURPS."
        />
      </Head>

      <div className="wrapper">
        <div className="tm-flex-center container-fluid shadow">
          <div className="box-image">
            <PiCoinsDuotone className="coins" />
            <h1>Calculadora de Prata</h1>
          </div>
          <div className="box-text">
            <div className="grid-2">
              <div className="input-box">
                <label htmlFor="kilos">Kilos</label>
                <input
                  type="text"
                  id="kilos"
                  value={kilos}
                  onChange={(e) => handleInputChange("kilos", e.target.value)}
                  placeholder="Enter kilos"
                />

                <label htmlFor="pounds">Pounds</label>
                <input
                  type="text"
                  id="pounds"
                  value={pounds}
                  onChange={(e) => handleInputChange("pounds", e.target.value)}
                  placeholder="Enter pounds"
                />

                <label htmlFor="coins">Coins</label>
                <input
                  type="text"
                  id="coins"
                  value={coins}
                  onChange={(e) => handleInputChange("coins", e.target.value)}
                  placeholder="Enter coins"
                />

                <label htmlFor="value">Value</label>
                <input
                  type="text"
                  id="value"
                  value={value}
                  onChange={(e) => handleInputChange("value", e.target.value)}
                  placeholder="Enter value"
                />
              </div>
              <div className="text-box">
                <p>
                  Esse conversor usa os seguintes valores para a conversão:
                  0.004 libras, 0.0018 kilogramas, e $4 baseado no GURPS Módulo
                  Básico. Se Você precisa de valores diferentes, por favor me
                  mande uma mensagem!
                </p>
                <div className="result-div">
                  <div className="result-title">Resultado</div> {result}
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2>Compartilhe</h2>
        <Share
          url={"https://campanhasdoboi.com.br/rpg/Post/Prata"}
          title={"Calculadora de Prata para moedas para GURPS"}
          description={
            "Um conversor para ajudar nos cálculoos de loot em GURPS calculando o peso das moedas em prata."
          }
        />{" "}
      </div>
    </>
  );
}
