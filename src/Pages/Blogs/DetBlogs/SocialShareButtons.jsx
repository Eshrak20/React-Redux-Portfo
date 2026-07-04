import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestIcon,
    PinterestShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    ThreadsIcon,
    ThreadsShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

const SocialShareButtons = ({
  title = "",
  url = window.location.href,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const size = 42;
  const round = true;

  return (
    <div className="flex flex-wrap gap-3">
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={size} round={round} />
      </FacebookShareButton>

      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={size} round={round} />
      </LinkedinShareButton>

      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={size} round={round} />
      </TwitterShareButton>

      <RedditShareButton url={url} title={title}>
        <RedditIcon size={size} round={round} />
      </RedditShareButton>

      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={size} round={round} />
      </TelegramShareButton>

      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={size} round={round} />
      </WhatsappShareButton>

      <ThreadsShareButton url={url} title={title}>
        <ThreadsIcon size={size} round={round} />
      </ThreadsShareButton>

      <PinterestShareButton
        url={url}
        media={url}
        description={title}
      >
        <PinterestIcon size={size} round={round} />
      </PinterestShareButton>

      <EmailShareButton
        url={url}
        subject={title}
        body={`${title}\n\n`}
      >
        <EmailIcon size={size} round={round} />
      </EmailShareButton>

      <button
        onClick={handleCopy}
        className="w-[42px] h-[42px] rounded-full border flex items-center justify-center hover:bg-primary hover:text-white transition-all"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
      </button>
    </div>
  );
};

export default SocialShareButtons;