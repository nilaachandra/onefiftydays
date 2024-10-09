import React from "react";

const Footer = () => {
  return (
    <footer className="pt-4">
      <h1 className="text-lg font-semibold">One Fifty Days</h1>
      <p className="text-sm">©2024 All rights reserved. Yep, all of them.</p>
      <p className="text-sm">
        Disclaimer: I don&apos;t own some of the images here—shocking, I know.
        Don&apos;t sue me, please.
      </p>
      <p className="text-sm">
        Host your own Journals/blog. Clone and Star this repository on{" "}
        <a
          href="https://github.com/nilaachandra/onefiftydays"
          target="_blank"
          className="text-blue-600 underline"
        >
          GitHub.
        </a>
      </p>
      <p className="text-sm">
        Support me by buying me a{" "}
        <a
          href="https://buymeacoffee.com/nilaacodes"
          target="_blank"
          className="text-blue-600 underline"
        >
          Coffee!
        </a>
      </p>
    </footer>
  );
};

export default Footer;
