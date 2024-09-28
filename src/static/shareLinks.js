import { IoLogoFacebook } from "react-icons/io5";
import { IoLogoReddit, IoLogoWhatsapp } from "react-icons/io5";
import { RiLinkedinBoxFill, RiTwitterFill } from "react-icons/ri";

export const shareLinks = [
    {
        title: 'Twitter',
        icon: <RiTwitterFill />,
        share: (url, title) => {
            let link = `https://twitter.com/share?url=${url}&text=${title} powered by EveHub`;
            return link;
        },
        color: 'from-blue-400 to-blue-500'
    },
    {
        title: 'LinkedIn',
        icon: <RiLinkedinBoxFill />,
        share: (url, title) => {
            let link = `https://linkedin.com/share?url=${url}&text=${title} powered by EveHub`;
            return link;
        },
        color: 'from-blue-400 to-blue-500'
    },
    {
        title: 'Reddit',
        icon: <IoLogoReddit />,
        share: (url, title) => {
            let link = `https://www.reddit.com/submit?url=${url}&title=${title} powered by EveHub`;
            return link;
        },
        color: 'from-red-400 to-red-500'
    },
    {
        title: 'WhatsApp',
        icon: <IoLogoWhatsapp />,
        share: (url, title) => {
            let link = `whatsapp://send?text=${title}: ${url} *powered by EveHub*`;
            return link;
        },
        color: 'from-green-400 to-green-500'
    },
    {
        title: 'Facebook',
        icon: <IoLogoFacebook />,
        share: (url, title) => {
            let link = `https://www.facebook.com/sharer/sharer.php?u=${url}&title=${title}`;
            return link;
        },
        color: 'from-blue-600 to-blue-700'
    },
];

