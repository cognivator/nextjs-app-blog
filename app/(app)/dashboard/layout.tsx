/**
 * Created by slhenty on 2023-10-5.
 */
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function RootLayout({children
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  )
}
