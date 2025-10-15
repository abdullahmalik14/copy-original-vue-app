/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    darkMode: "class",
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1010px",
        xl: "1365px",
      },
      fontFamily: {
        sans: [
          "Poppins",
          "Inter",
          "Montserrat",
          "Open Sans",
          "arial",
          "sans-serif",
        ],
      },
      colors: {
        // Background colors
        primary: {
          DEFAULT: "#939393",
          dark: "#181a1b",
        },
        accent: {
          pink: {
            light: "#fb5ba2",
            dark: "#940444",
          },
          green: {
            light: "#07f468",
            dark: "#06c353",
          },
        },
        disabled: {
          light: {
            bg: "#9f9f9f",
            shadow: "#636363",
            text: "#000000",
          },
          dark: {
            bg: "#4e5558",
            shadow: "#4b5154",
            text: "#e8e6e3",
          },
        },
        input: {
          DEFAULT: "rgba(255, 255, 255, 0.2)",
          dark: "rgba(24, 26, 27, 0.2)",
        },
        error: {
          DEFAULT: "#ff4848",
          dark: "#a10000",
        },
        status: {
          new: "#ffe500",
          dot: {
            light: "#fdb022",
            dark: "#b77702",
          },
          trigger: {
            light: "#fac515",
            dark: "#8f6e03",
          },
        },
        avatar: {
          DEFAULT: "#4CC9F0",
          dark: "#4CC9F0",
        },
        avatar: {
          bg: {
            light: "#4cc9f0",
            dark: "#0d799a",
          },
        },
        cover: {
          overlay: "rgba(0, 0, 0, 0.5)",
        },
        panel: {
          light: {
            DEFAULT: "rgba(234, 236, 240, 0.7)",
            border: "#d0d5dd",
            buttonHover: "rgba(255, 255, 255, 0.1)",
          },
          dark: {
            DEFAULT: "rgba(34, 37, 38, 0.7)",
            border: "#3b4043",
            buttonHover: "rgba(24, 26, 27, 0.1)",
          },
        },
        notification: {
          hover: {
            DEFAULT: "rgba(251, 91, 162, 0.1)",
            dark: "rgba(251, 91, 162, 0.1)",
          },
        },
        sidebar: {
          bg: {
            DEFAULT: "rgba(255, 255, 255, 0.7)",
            dark: "rgba(24, 26, 27, 0.7)",
          },
          active: {
            DEFAULT: "rgba(251, 91, 162, 0.2)",
            dark: "rgba(148, 4, 68, 0.2)",
          },
          text: {
            DEFAULT: "#475467",
            dark: "#B1B1AA",
          },
          "active-text": {
            DEFAULT: "#ff0066",
            dark: "#ff1a75",
          },
          logout: {
            bg: {
              DEFAULT: "rgba(41, 112, 255, 0.1)",
              dark: "rgba(0, 60, 179, 0.1)",
            },
            hover: {
              DEFAULT: "rgba(12, 17, 29, 0.1)",
              dark: "rgba(10, 14, 23, 0.1)",
            },
            text: {
              DEFAULT: "#2970ff",
              dark: "#3698ff",
            },
          },
          help: {
            text: {
              DEFAULT: "#667085",
              dark: "#9e9589",
            },
          },
        },
        submenu: {
          bg: {
            DEFAULT: "rgba(249,250,251,0.7)",
            dark: "rgba(27,29,30,0.7)",
          },
          title: {
            text: {
              DEFAULT: "#344054",
              dark: "#bdb7af",
            },
          },
          item: {
            text: {
              DEFAULT: "#667085",
              dark: "#9e9589",
            },
            hoverText: {
              DEFAULT: "#07f468",
              dark: "#23f97a",
            },
            "hover-shadow": {
              DEFAULT: "#07f468",
              dark: "#06c353",
            },
            "hover-bg": {
              DEFAULT: "rgba(12,17,29,0.1)",
              dark: "rgba(10,14,23,0.1)",
            },
          },
        },
        text: {
          DEFAULT: "#ffffff",
          secondary: {
            light: "#667085",
            dark: "#9e9589",
          },
          tab: {
            light: "#344054",
            dark: "#bdb7af",
            active: {
              light: "#0c111d",
              dark: "#dbd8d3",
            },
          },
          badge: {
            light: "#667085",
            dark: "#9e9589",
          },
          notification: {
            light: "#000000",
            dark: "#e8e6e3",
          },
          time: {
            light: "#667085",
            dark: "#9e9589",
          },
          link: {
            light: "#1c39ff",
            dark: "#1c39ff",
            hover: {
              light: "#0720c1",
              dark: "#0720c1",
            },
          },
          quaternary: "#667085",
        },
        placeholder: {
          DEFAULT: "#ffffff",
          dark: "#e8e6e3",
        },

        handle: {
          light: "#d0d5dd",
          dark: "#cecac4",
        },

        border: {
          DEFAULT: "#DEE5EC",
          tab: {
            light: "#d0d5dd",
            dark: "#2f3335",
            hover: {
              light: "#667085",
              dark: "#525a6a",
            },
            active: {
              light: "#0c111d",
              dark: "#0a0e17",
            },
          },
          notification: {
            light: "#eaecf0",
            dark: "#353a3c",
            default: {
              light: "#98a2b3",
              dark: "#494f52",
            },
            warning: {
              light: "#fdb022",
              dark: "#a76d02",
            },
            success: {
              light: "#2ed3b7",
              dark: "#1f937f",
            },
            info: {
              light: "#2ce",
              dark: "#0c88a1",
            },
            destructive: {
              light: "#ff4405",
              dark: "#b12d00",
            },
          },
          icon: "#98A2B3",
        },

        errorBorder: {
          DEFAULT: "#ff4405",
          dark: "#b12d00",
        },

        background: {
          light: {
            DEFAULT: "rgba(255, 255, 255, 0.2)",
            input: "rgba(255, 255, 255, 0.3)",
            inputHover: "rgba(255, 255, 255, 0.5)",
          },
          dark: {
            DEFAULT: "rgba(24, 26, 27, 0.2)",
            input: "rgba(0, 0, 0, 0.3)",
            inputHover: "rgba(0, 0, 0, 0.5)",
          },
          header: {
            light: "#eaecf0",
            dark: "#222526",
          },
          notification: {
            light: "rgba(255, 255, 255, 0.5)",
            dark: "rgba(24, 26, 27, 0.5)",
            panel: {
              light: "rgba(255, 255, 255, 0.9)",
              dark: "rgba(24, 26, 27, 0.9)",
            },
            icon: {
              green: "#07f468",
              default: {
                light: "rgba(152, 162, 179, 0.1)",
                dark: "rgba(67, 76, 91, 0.1)",
              },
              warning: {
                light: "rgba(253, 176, 34, 0.1)",
                dark: "rgba(183, 119, 2, 0.1)",
              },
              success: {
                light: "rgba(46, 211, 183, 0.1)",
                dark: "rgba(35, 168, 151, 0.1)",
              },
              info: {
                light: "rgba(34, 204, 238, 0.1)",
                dark: "rgba(14, 152, 180, 0.1)",
              },
              destructive: {
                light: "rgba(255, 68, 5, 0.1)",
                dark: "rgba(201, 51, 0, 0.1)",
              },
            },
            smallIcon: {
              default: {
                light: "#98a2b3",
                dark: "#434c5b",
              },
              warning: {
                light: "#fdb022",
                dark: "#b77702",
              },
              success: {
                light: "#2ed3b7",
                dark: "#23a897",
              },
              info: {
                light: "#2ce",
                dark: "#0e98b4",
              },
              destructive: {
                light: "#ff4405",
                dark: "#c93300",
              },
            },
          },
        },
        bg: {
          status: {
            light: "#ffe500",
            dark: "#a99700",
          },
          row: {
            odd: "rgba(242, 244, 247, 0.5)",
            dark: {
              odd: "rgba(30, 32, 34, 0.5)",
            },
          },
          statusTag: "#000",
          dark: {
            statusTag: "#181a1b",
          },
        },
        cta: {
          dismiss: {
            light: "#344054",
            dark: "#bdb7af",
            hover: "#1c39ff",
          },
          warning: {
            light: "#b54708",
            dark: "#f78d4f",
          },
          success: {
            light: "#107569",
            dark: "#80eee1",
          },
          info: {
            light: "#088ab2",
            dark: "#52d0f7",
          },
          destructive: {
            light: "#97180c",
            dark: "#f37266",
          },
        },

        buttonPrimary: {
          DEFAULT: "#ff0066",
          dark: "#cc0052",
        },
        buttonPrimaryBorder: {
          DEFAULT: "#ff0066",
          dark: "#b30047",
        },
        buttonSecondary: {
          DEFAULT: "rgba(255, 255, 255, 0.15)",
          dark: "rgba(24, 26, 27, 0.15)",
        },
        buttonSecondaryBorder: {
          DEFAULT: "#ffffff",
          dark: "#303436",
        },

        // Checkbox colors
        checkbox: {
          DEFAULT: "deeppink",
          dark: "#c00068",
        },
        checkboxBorder: {
          DEFAULT: "#D0D5DD",
          dark: "#3b4043",
        },

        // Dropdown colors
        dropdown: {
          DEFAULT: "#ffffff",
          dark: "#181a1b",
        },
        dropdownText: {
          DEFAULT: "#111827",
          dark: "#d6d3cd",
        },
        dropdownBorder: {
          DEFAULT: "#e5e7eb",
          dark: "#363b3d",
        },
        content: {
          primary: "#0c111d",
          secondary: "#344054",
          tertiary: "#667085",
          dark: {
            primary: "#e8e6e3",
            secondary: "#bdb7af",
            tertiary: "#b1aaa0",
          },
        },
        fce40d: "#fce40d",
        d0d5dd: "#d0d5dd",
        ff00a6: "#ff00a6",
        dee5ec: "#dee5ec",
      },
      backdropBlur: {
        xs: "5px",
        lg: "25px",
      },
      boxShadow: {
        sidebar: "0 0 8px 0 rgba(0, 0, 0, 0.08)",
        custom: "4px 0 10px 0 rgba(0, 0, 0, 0.08)",
        green: "4px 4px 0 0 #07f468",
      },
      keyframes: {
        bouncedown: {
          '0%': {
            opacity: '1',
            width: '100%',
            height: 'auto'
          },
          '100%': {
            opacity: '0',
            width: '60px',
            height: '80px'
          }
        },
        bouncup: {
          '0%': {
            opacity: '0',
            width: '60px',
            height: 'auto',
            bottom: '0',
            left: '0'
          },
          '80%': {
            opacity: '1',
            width: '100%',
            height: 'auto',
            bottom: '2px',
            left: '2px'
          },
          '100%': {
            opacity: '1',
            width: '100%',
            height: 'auto',
            bottom: '0',
            left: '0'
          }
        }
      },
      animation: {
        bouncedown: 'bouncedown 0.1s ease forwards',
        bouncup: 'bouncup 0.1s ease forwards'
      }
    },
  },
  safelist: [
    // Ye tumhare complex hover classes ko Tailwind JIT ko batayega ki ye use hone wale hain
    "hover:bg-[linear-gradient(180deg,rgba(87,85,85,0.50)_0%,rgba(0,0,0,0.50)_100%)]",
    "hover:[box-shadow:0px_0px_20px_0px_rgba(255,150,192,0.8)_inset,_8px_8px_30px_0px_rgba(255,0,102,0.7),_0px_0px_35px_0px_rgba(255,255,221,0.5),_-8px_-8px_30px_0px_rgba(255,0,0,0.7)]",
  ],
  plugins: [],
};
