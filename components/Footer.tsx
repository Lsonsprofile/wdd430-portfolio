interface FooterProps {
  year: number;
}

export default function Footer({ year }: FooterProps) {  
  return (
    <footer className="bg-gray-800 text-white py-4 mt-12">
      <div className="container mx-auto text-center">
        <p>Copyright &copy; {year} | Emmanuel Ndogo | All rights reserved</p>
      </div>
    </footer>
  );
}