import React from 'react';
import { Search, User } from 'lucide-react';
import Logo from './ui/Logo';
import Input from './ui/Input';
import Button from './ui/Button';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          <div className="flex items-center space-x-4">
            <Input
              icon={<Search className="h-5 w-5" />}
              placeholder="Rechercher un professionnel..."
              className="w-64"
            />
            
            <Button size="md">
              <User className="h-5 w-5 mr-2" />
              <span>Connexion</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;