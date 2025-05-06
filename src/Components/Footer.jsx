import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white py-10 p-7" style={{ color: '#FF7E00' }}>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-bold text-lg mb-8">CHOCO Cakes</h3>
          <p className="text-sm mb-8 mt-0">
            Established in 2024, CHOCO Cake has quickly emerged as the most popular Cake provider in  Sri Lanka.
          </p>

          <div style={{ marginTop: "2rem" }}>
            {/* Contacts Section */}
            <div className="">
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
                    <span>
                      No. 225/5, Mahara, Nugegoda
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
                    <span>0761321135</span>
                  </a>
                </li>

                {/* email link */}
                <li className="flex items-center hover:underline">
                  <a
                    href="mailto:chococake433@gmail.com"
                    className="flex items-center"
                  >
                    <img
                      src="/images/email.png"
                      alt="Email"
                      className="w-4 h-4 mr-2"
                    />
                    <span>chococake433@gmail.com</span>
                  </a>
                </li>
              </ul>

            </div>
          </div>
        </div>

        {/* Useful Links Section */}
        <div className="ml-32 mt-1 hidden md:block">
          <h3 className="font-bold text-lg mb-4">USEFUL LINKS</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="/products" className="hover:underline">
                <span>Products</span>
              </a>
            </li>
          </ul>

          <div className="mt-12">
            <h3 className="font-bold text-lg mb-4">Social Media</h3>
            <div className="flex space-x-4">
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
