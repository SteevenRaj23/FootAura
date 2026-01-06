import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

export default function Help() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7ED] via-[#FDF2F8] to-[#EFF6FF] flex items-center justify-center px-6">

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl w-full grid md:grid-cols-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden"
      >

        {/* LEFT */}
        <motion.div
          variants={fadeUp}
          className="p-10 md:p-14 flex flex-col justify-between"
        >
          <div>
            <motion.h1 variants={fadeUp} className="text-4xl font-extrabold text-gray-800">
              Foot<span className="text-[#E8B86D]">Aura</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-4 text-gray-600 leading-relaxed">
              Comfort meets style.  
              Reach out for orders, sizing help, or collaborations.
            </motion.p>

            <motion.div variants={container} className="mt-10 space-y-4 text-sm text-gray-700">
              {[
                "📍 Bangalore, India",
                "✉️ support@footaura.com",
                "📞 +91 98765 43210",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-[#E8B86D]">{item.split(" ")[0]}</span>
                  <span>{item.slice(2)}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.p variants={fadeUp} className="text-xs text-gray-400 mt-10">
            © {new Date().getFullYear()} FootAura. Made with care.
          </motion.p>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          variants={fadeUp}
          className="p-10 md:p-14 bg-white rounded-t-3xl md:rounded-none md:rounded-r-3xl"
        >
          <motion.h2 variants={fadeUp} className="text-3xl font-bold text-gray-800 mb-8">
            Get in Touch
          </motion.h2>

          <motion.form variants={container} className="space-y-6">
            {["Name", "Email", "Message"].map((label, i) => (
              <motion.div key={i} variants={fadeUp} className="relative">
                {label !== "Message" ? (
                  <input
                    type={label === "Email" ? "email" : "text"}
                    required
                    className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 focus:border-[#E8B86D] outline-none"
                  />
                ) : (
                  <textarea
                    rows="4"
                    required
                    className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 focus:border-[#E8B86D] outline-none resize-none"
                  />
                )}

                <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all
                  peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#E8B86D]
                  peer-valid:-top-3 peer-valid:text-xs">
                  {label}
                </label>
              </motion.div>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 py-3 rounded-full bg-gradient-to-r from-[#FDE68A] to-[#FCA5A5]
                         text-gray-800 font-semibold tracking-wide shadow-md hover:shadow-lg transition"
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>

      </motion.div>
    </div>
  );
}
