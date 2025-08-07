import { Fragment } from "react";
import { ThemeProvider } from "@/providers";

const AppProvider = ({children}: {children: React.ReactNode}) => {
    return ( 
        <Fragment>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Fragment>
     );
}
 
export default AppProvider