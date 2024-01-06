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
        <FacebookIcon size={50} round={true} />
        <span></span>
      </FacebookShareButton>
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={50} round={true} />
      </WhatsappShareButton>
      <TelegramShareButton url={url}>
        <TelegramIcon size={50} round={true} />
        <span></span>
      </TelegramShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={50} round={true} />
        <span></span>
      </TwitterShareButton>
      <a
        href={`https://discord.com/share?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={"/rpg/" + "discord-icon.svg"}
          alt="Share on Discord"
          width={50}
          height={50}
        />{" "}
      </a>
    </div>
  );
}
