// Share.js
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";
import Image from "next/image";

export default function Share({ url, title, description }) {
  return (
    <div className="share-buttons">
      <FacebookShareButton url={url}>
        <FacebookIcon size={35} round={true} />
        <span></span>
      </FacebookShareButton>
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={35} round={true} separator=":: " />
      </WhatsappShareButton>
      <TelegramShareButton url={url}>
        <TelegramIcon size={35} round={true} />
        <span></span>
      </TelegramShareButton>
      <TwitterShareButton
        url={url}
        title={title}
        hashtags={["Boifubá"]}
        via="CampanhasdoBoi"
      >
        <TwitterIcon size={35} round={true} />
      </TwitterShareButton>
      <a
        href={`https://discord.com/share?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  );
}
