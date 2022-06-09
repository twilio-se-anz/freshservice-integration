import { Flex } from "@twilio/flex-ui/src/FlexGlobal";
import { ThemerParameters } from "./ThemerParameters";

export class Themer{
  static generateTheme(params: ThemerParameters) {
    
    const { lightText, darkText, background, themeName } = params;

    const newThemeConfig = {
      colorTheme: {
        baseName: themeName || "FlexLight",
        colors: {
          lightText: lightText,
          darkText: darkText,
        },
        overrides: {
          MainHeader: {
            Container: {
              color: background,
              background: lightText,
            },
            Button: {
              color: lightText,
              background: background,
              lightHover: false
            }
          },

          SideNav: {
            Container: {
              background: "#ebf3f5",
            },
            Button: {
              background: "#ebf3f5",
              color: darkText,
              lightHover: false
            },
            Icon: {
              color: "#121829"
            }
          },

          TaskCanvasHeader: {
            WrapupTaskButton: {
              background: background,
              color: lightText,
            },
            EndTaskButton: {
              background: "#121829",
              color: lightText,
            }
          },
          TaskList: {
            Item: {
              Icon: {
                background: background,
                color: lightText,
              }
            }
          }
        }
      }
    };
    
    return newThemeConfig as Flex.Config;
  }
}