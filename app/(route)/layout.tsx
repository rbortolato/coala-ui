import './globals.css'
import type { Metadata } from 'next'
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { ptBR } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";

const rootElement = document.getElementById("root");
const theme = createTheme(ptBR)

export const metadata: Metadata = {
  title: 'Book Exchange',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <ThemeProvider theme={theme}>
          <StyledEngineProvider injectFirst>
            {children}
          </StyledEngineProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
