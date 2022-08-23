import { useState } from 'react';
import NavbarAdmin from '../NavbarAdmin/NavbarAdmin';
import ElementToView from './ElementToView';

export type AdminElements = 'dashboard' | 'carts' | 'products' | 'users';

function AdminPanel() {
  const [elementToView, setElementToView] =
    useState<AdminElements>('dashboard');

  const handleElementToView = (value: AdminElements) => {
    setElementToView(value);
  };
  return (
    <div className="AppAdmin">
      <NavbarAdmin handleElementToView={handleElementToView} />
      <main>
        <ElementToView element={elementToView} />
      </main>
    </div>
  );
}

export default AdminPanel;
