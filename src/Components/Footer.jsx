import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white py-10 p-7">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* SPK Stores Section */}
        <div>
          <h3 className="font-bold text-lg mb-8">SPK STORES</h3>
          <p className="text-sm mb-8 mt-0">
            Established in 2021, SPK Store has quickly emerged as a trusted
            retailer specializing in cutting-edge technology products.
          </p>

          <div style={{ marginTop: "2rem" }}>
            <p className="text-sm mt-3">
              <strong>Company Registration No:</strong>{" "}
              <span style={{ color: "#BDBDBD", marginLeft: "1.3rem" }}>
                PV105273
              </span>
            </p>

            <p className="text-sm mt-3">
              <strong>Company Tax File:</strong>{" "}
              <span style={{ color: "#BDBDBD", marginLeft: "4.7rem" }}>
                No101027015
              </span>
            </p>

            <p className="text-sm mt-3">
              <strong>Bankers of the Company:</strong>{" "}
              <span style={{ color: "#BDBDBD", marginLeft: "1.9rem" }}>
                Nation Trust Bank
              </span>
            </p>
          </div>
        </div>

        {/* Useful Links Section */}
        <div className="ml-32 mt-1 hidden md:block">
          <h3 className="font-bold text-lg mb-4">USEFUL LINKS</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                <span style={{ color: "#BDBDBD" }}>Home</span>
              </a>
            </li>
            <li>
              <a href="/drones" className="hover:underline">
                <span style={{ color: "#BDBDBD" }}>Drones</span>
              </a>
            </li>
            <li>
              <a href="/gimbles" className="hover:underline">
                <span style={{ color: "#BDBDBD" }}>Gimbles</span>
              </a>
            </li>
            <li>
              <a href="/smartwatches" className="hover:underline">
                <span style={{ color: "#BDBDBD" }}>Smart Watches </span>
              </a>
            </li>
            <li>
              <a href="/others" className="hover:underline">
                <span style={{ color: "#BDBDBD" }}>Other Accessories</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Contacts Section */}
        <div className="ml-24 md:ml-24">
          <h3 className="font-bold text-lg mb-4">CONTACTS</h3>
          <ul className="space-y-2 text-sm">
            {/* location link */}
            <li className="flex items-center hover:underline">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=No.+22%2F1%2FA,+Kurunagala,+Kandy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <img
                  src="/images/map1.png"
                  alt="Map"
                  className="w-5 h-5 mr-2"
                />
                <span style={{ color: "#BDBDBD" }}>
                  No. 22/1/A, Kurunagala, Kandy
                </span>
              </a>
            </li>

            {/* telephone link */}
            <li className="flex items-center hover:underline">
              {/* when entering the number you have to write 94 not 0 otherwise it's not redirecting to the chat */}
              <a href="https://wa.me/94760079848" className="flex items-center">
                <img
                  src="/images/telephone.png"
                  alt="Telephone"
                  className="w-4 h-4 mr-2"
                />
                <span style={{ color: "#BDBDBD" }}>0760079848</span>
              </a>
            </li>

            {/* email link */}
            <li className="flex items-center hover:underline">
              <a
                href="mailto:contacspkstore@gmail.com"
                className="flex items-center"
              >
                <img
                  src="/images/email.png"
                  alt="Email"
                  className="w-4 h-4 mr-2"
                />
                <span style={{ color: "#BDBDBD" }}>contacspkstore@gmail.com</span>
              </a>
            </li>
          </ul>

          <div className="flex space-x-4 mt-16 ml-0 md:ml-0 lg:ml-24">
            {/* fb link */}
            <a
              href="https://www.facebook.com/share/ZB13PbDeNsGHQHXY/?mibextid=qi2Omg"
              className="hover:underline"
            >
              <img src="/images/fb.png" alt="Facebook" className="w-6 h-6" />
            </a>

            {/* instagram link */}
            <a
              href="https://www.instagram.com/prabhathsahan?igsh=cDQzeTRmZ2M2Zmds&utm_source=qr"
              className="hover:underline"
            >
              <img
                src="/images/insta.png"
                alt="Instagram"
                className="w-6 h-6"
              />
            </a>

            {/* tiktok link */}
            <a
              href="https://www.tiktok.com/@spkstore?_t=8p8m36zQPuU&_r=1"
              className="hover:underline"
            >
              <img src="/images/tiktok.png" alt="TikTok" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div
        className="border-t border-white text-center"
        style={{ marginTop: "80px", paddingTop: "1px" }}
      >
        <p className="text-[12px] mt-5">
          <a
            href="https://www.roodwave.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            © Copyright 2024 ROODWAVE. All Rights Reserved by RW
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
