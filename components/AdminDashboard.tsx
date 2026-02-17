import React, { useState, useEffect } from 'react';
import { Order, Product } from '../types';
import TacticalButton from './TacticalButton';
import { LayoutDashboard, Users, Package, LogOut, TrendingUp, AlertTriangle, Layers, ShoppingBag, Eye, Printer, X, Hexagon, Plus, Trash2, Edit, Save } from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onUpdateProduct: (id: number, field: string, value: any) => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
  onUpdateOrderStatus: (id: string, status: Order['status']) => void;
  onLogout: () => void;
}

type Tab = 'OVERVIEW' | 'INVENTORY' | 'ORDERS';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  products, 
  orders, 
  onUpdateProduct,
  onAddProduct,
  onEditProduct,
  onDeleteProduct, 
  onUpdateOrderStatus, 
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('OVERVIEW');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // Null means Adding new
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '', category: 'Firearms', price: 0, stock: 0, image: '', description: '', specs: {}
  });
  const [tempSpecs, setTempSpecs] = useState<{key: string, value: string}[]>([{key: '', value: ''}]);

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
      const specsArray = Object.entries(editingProduct.specs).map(([key, value]) => ({ key, value }));
      setTempSpecs(specsArray.length > 0 ? specsArray : [{key: '', value: ''}]);
    } else {
      // Reset for Add
      setFormData({
        name: '', category: 'Firearms', price: 0, stock: 0, image: '', description: '', specs: {}
      });
      setTempSpecs([{key: '', value: ''}]);
    }
  }, [editingProduct, isProductModalOpen]);

  const stats = [
    { label: 'Active Deployments', value: orders.filter(o => o.status === 'PENDING' || o.status === 'DEPLOYED').length.toString(), icon: Package, change: 'Active' },
    { label: 'Total Revenue', value: `$${orders.reduce((acc, o) => acc + o.total, 0).toFixed(0)}`, icon: TrendingUp, change: 'YTD' },
    { label: 'Critical Stock', value: products.filter(p => p.stock < 5).length.toString(), icon: AlertTriangle, color: 'text-red-500' },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm('CONFIRM DELETION: This action permanently removes the asset from the database. Proceed?')) {
      onDeleteProduct(id);
    }
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
    const newSpecs = [...tempSpecs];
    newSpecs[index][field] = val;
    setTempSpecs(newSpecs);
  };

  const addSpecRow = () => {
    setTempSpecs([...tempSpecs, {key: '', value: ''}]);
  };

  const removeSpecRow = (index: number) => {
    setTempSpecs(tempSpecs.filter((_, i) => i !== index));
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert specs array back to object
    const specsObj: Record<string, string> = {};
    tempSpecs.forEach(item => {
      if (item.key.trim() && item.value.trim()) {
        specsObj[item.key.trim()] = item.value.trim();
      }
    });

    const finalProductData = {
      ...formData,
      specs: specsObj,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    if (editingProduct) {
      onEditProduct({ ...finalProductData, id: editingProduct.id } as Product);
    } else {
      onAddProduct(finalProductData as Omit<Product, 'id'>);
    }
    setIsProductModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn relative">
      
      {/* --- INVOICE MODAL --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 no-print">
          <div className="bg-white text-black w-full max-w-3xl h-[90vh] overflow-y-auto relative shadow-2xl">
            
            {/* Modal Controls */}
            <div className="absolute top-4 right-4 flex gap-2 no-print">
              <button onClick={handlePrint} className="bg-black text-white p-2 hover:bg-gray-800 transition-colors">
                <Printer className="w-5 h-5" />
              </button>
              <button onClick={() => setSelectedOrder(null)} className="bg-red-600 text-white p-2 hover:bg-red-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Invoice Content (Visible in Print) */}
            <div className="p-12 print-area">
              {/* Header */}
              <div className="flex justify-between items-start mb-12 border-b-2 border-black pb-8">
                <div>
                   <div className="flex items-center gap-2 mb-2">
                     <Hexagon className="w-8 h-8 text-black" strokeWidth={2} />
                     <h1 className="text-3xl font-bold font-mono tracking-tighter">AAA TACTICAL</h1>
                   </div>
                   <p className="font-mono text-xs">
                     SECTOR 7, INDUSTRIAL ZONE<br/>
                     NEVADA, USA 89101<br/>
                     +1 (555) 867-5309
                   </p>
                </div>
                <div className="text-right">
                  <h2 className="text-4xl font-black uppercase tracking-widest mb-2">INVOICE</h2>
                  <p className="font-mono text-sm">ID: <span className="font-bold">{selectedOrder.id}</span></p>
                  <p className="font-mono text-sm">DATE: {selectedOrder.date}</p>
                </div>
              </div>

              {/* Bill To */}
              <div className="mb-12 flex justify-between">
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm mb-2 text-gray-600">Issued To:</h3>
                  <p className="font-mono font-bold text-lg">{selectedOrder.customer.name}</p>
                  <p className="font-mono text-sm">{selectedOrder.customer.address}</p>
                  <p className="font-mono text-sm">{selectedOrder.customer.email}</p>
                </div>
                <div className="text-right">
                  <div className="inline-block border-4 border-black p-2 transform -rotate-12 opacity-50">
                    <span className="font-black text-xl uppercase">{selectedOrder.status}</span>
                  </div>
                </div>
              </div>

              {/* Items */}
              <table className="w-full mb-12 font-mono text-sm">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left py-2 font-black">ITEM DESCRIPTION</th>
                    <th className="text-center py-2 font-black">QTY</th>
                    <th className="text-right py-2 font-black">UNIT PRICE</th>
                    <th className="text-right py-2 font-black">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-200">
                      <td className="py-4">
                        <span className="font-bold block">{item.name}</span>
                        <span className="text-xs text-gray-500 uppercase">{item.category} // {Object.values(item.specs)[0]}</span>
                      </td>
                      <td className="py-4 text-center">{item.quantity}</td>
                      <td className="py-4 text-right">${item.price.toFixed(2)}</td>
                      <td className="py-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="flex justify-end mb-20">
                <div className="w-1/2 space-y-2 font-mono text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${(selectedOrder.total - selectedOrder.tax - selectedOrder.shipping).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8.25%):</span>
                    <span>${selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-b border-black pb-2">
                    <span>Shipping & Handling:</span>
                    <span>${selectedOrder.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-black text-xl pt-2">
                    <span>TOTAL:</span>
                    <span>${selectedOrder.total.toFixed(2)} USD</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t-2 border-black pt-4 text-center font-mono text-xs">
                <p>THANK YOU FOR YOUR BUSINESS. END USER AGREEMENT APPLIES.</p>
                <p>RESTRICTED EXPORT. ITAR REGULATIONS IN EFFECT.</p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- PRODUCT MANAGEMENT MODAL --- */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-military-900 border border-military-600 w-full max-w-2xl max-h-[90vh] overflow-y-auto clip-angled-sm shadow-2xl flex flex-col">
            
            <div className="bg-military-800 p-6 border-b border-military-700 flex justify-between items-center">
              <h2 className="text-xl font-heading font-bold text-white uppercase tracking-widest flex items-center gap-2">
                {editingProduct ? <Edit className="w-5 h-5 text-military-accent" /> : <Plus className="w-5 h-5 text-military-accent" />}
                {editingProduct ? 'Edit Asset Protocol' : 'New Asset Protocol'}
              </h2>
              <button onClick={() => setIsProductModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="p-8 space-y-6 flex-grow overflow-y-auto">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-military-accent uppercase tracking-widest">Asset Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/50 border border-military-600 text-white p-3 font-mono text-sm focus:border-military-accent outline-none"
                    placeholder="E.g. M4A1 Carbine"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-military-accent uppercase tracking-widest">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as Product['category']})}
                    className="w-full bg-black/50 border border-military-600 text-white p-3 font-mono text-sm focus:border-military-accent outline-none"
                  >
                    <option value="Firearms">Firearms</option>
                    <option value="Ammunition">Ammunition</option>
                    <option value="Tactical Gear">Tactical Gear</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-military-accent uppercase tracking-widest">Price (USD)</label>
                  <input 
                    type="number" 
                    required 
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                    className="w-full bg-black/50 border border-military-600 text-white p-3 font-mono text-sm focus:border-military-accent outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-military-accent uppercase tracking-widest">Initial Stock</label>
                  <input 
                    type="number" 
                    required 
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                    className="w-full bg-black/50 border border-military-600 text-white p-3 font-mono text-sm focus:border-military-accent outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-military-accent uppercase tracking-widest">Image URL</label>
                <input 
                  type="url" 
                  required 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-black/50 border border-military-600 text-white p-3 font-mono text-sm focus:border-military-accent outline-none"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-military-accent uppercase tracking-widest">Description</label>
                <textarea 
                  required 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full bg-black/50 border border-military-600 text-white p-3 font-mono text-sm focus:border-military-accent outline-none"
                  placeholder="Operational details..."
                />
              </div>

              {/* Technical Specs Builder */}
              <div className="border-t border-military-700 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[10px] font-mono text-military-accent uppercase tracking-widest">Technical Specifications</label>
                  <button type="button" onClick={addSpecRow} className="text-xs text-green-500 hover:text-green-400 font-mono flex items-center gap-1">
                    <Plus className="w-3 h-3" /> ADD SPEC
                  </button>
                </div>
                <div className="space-y-3">
                  {tempSpecs.map((spec, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Key (e.g. Caliber)"
                        value={spec.key}
                        onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                        className="flex-1 bg-black/50 border border-military-600 text-white p-2 font-mono text-xs focus:border-military-accent outline-none"
                      />
                      <input 
                        type="text" 
                        placeholder="Value (e.g. 5.56mm)"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                        className="flex-1 bg-black/50 border border-military-600 text-white p-2 font-mono text-xs focus:border-military-accent outline-none"
                      />
                      <button 
                        type="button" 
                        onClick={() => removeSpecRow(index)}
                        className="bg-red-900/50 hover:bg-red-900 text-white p-2 border border-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </form>

            <div className="p-6 bg-military-800 border-t border-military-700 flex justify-end gap-4">
              <button 
                onClick={() => setIsProductModalOpen(false)}
                className="px-6 py-3 font-mono text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
              >
                Cancel
              </button>
              <TacticalButton onClick={handleProductSubmit} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                {editingProduct ? 'Save Updates' : 'Initialize Asset'}
              </TacticalButton>
            </div>
          </div>
        </div>
      )}

      {/* Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/10 pb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-military-accent flex items-center justify-center clip-angled-sm">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold text-white uppercase tracking-widest">
              Command & Control
            </h1>
            <p className="text-military-accent font-mono text-xs tracking-[0.2em]">
              ADMINISTRATION DASHBOARD // LEVEL 5 ACCESS
            </p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-opaque-low hover:text-red-500 font-mono text-xs transition-colors uppercase tracking-widest"
        >
          <LogOut className="w-4 h-4" /> Terminate Session
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 font-heading font-bold tracking-widest text-sm">
        {[
          { id: 'OVERVIEW', icon: LayoutDashboard, label: 'Overview' },
          { id: 'INVENTORY', icon: Layers, label: 'Inventory Command' },
          { id: 'ORDERS', icon: ShoppingBag, label: 'Order Ops' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex items-center gap-2 px-6 py-3 clip-angled-sm transition-all ${
              activeTab === tab.id 
                ? 'bg-military-accent text-white' 
                : 'bg-black/40 border border-white/10 text-opaque-med hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW CONTENT */}
      {activeTab === 'OVERVIEW' && (
        <div className="animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-black/60 backdrop-blur-md border border-white/10 p-6 clip-angled-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <stat.icon className="w-16 h-16 text-white" />
                </div>
                <p className="text-opaque-med font-mono text-xs uppercase tracking-widest mb-2">{stat.label}</p>
                <div className="flex items-end gap-3">
                  <h3 className={`text-3xl font-heading font-bold ${stat.color || 'text-white'}`}>{stat.value}</h3>
                  <span className="text-green-500 font-mono text-xs mb-1">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-military-900/80 border border-military-accent/20 p-6 clip-angled-sm">
            <h3 className="text-lg font-heading font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <Users className="w-4 h-4 text-military-accent" />
              System Status
            </h3>
            <div className="space-y-4 font-mono text-xs">
              <div className="flex gap-3 border-l-2 border-green-500 pl-3 py-1">
                <span className="text-opaque-low">LIVE</span>
                <span className="text-opaque-med">Inventory database synced. All sectors green.</span>
              </div>
              <div className="flex gap-3 border-l-2 border-military-700 pl-3 py-1">
                <span className="text-opaque-low">LOG</span>
                <span className="text-opaque-med">Admin login detected from secure terminal.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INVENTORY CONTENT */}
      {activeTab === 'INVENTORY' && (
        <div className="bg-black/60 backdrop-blur-md border border-white/10 p-8 clip-angled-sm animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-heading font-bold text-white uppercase tracking-widest">
              Global Inventory Management
            </h3>
            <TacticalButton onClick={handleOpenAddModal} className="py-2 px-4 text-xs">
              <Plus className="w-4 h-4" /> Add Asset
            </TacticalButton>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-sm text-left">
              <thead>
                <tr className="border-b border-white/10 text-opaque-low text-xs">
                  <th className="py-3 font-normal tracking-widest">ID</th>
                  <th className="py-3 font-normal tracking-widest">ASSET NAME</th>
                  <th className="py-3 font-normal tracking-widest">CATEGORY</th>
                  <th className="py-3 font-normal tracking-widest">STOCK LEVEL</th>
                  <th className="py-3 font-normal tracking-widest">UNIT PRICE</th>
                  <th className="py-3 font-normal tracking-widest text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors text-opaque-med">
                    <td className="py-4 text-white">#{product.id}</td>
                    <td className="py-4 font-bold">{product.name}</td>
                    <td className="py-4 text-xs uppercase">{product.category}</td>
                    <td className="py-4">
                      {/* Inline Edit for Stock */}
                      <input 
                        type="number" 
                        value={product.stock}
                        onChange={(e) => onUpdateProduct(product.id, 'stock', parseInt(e.target.value))}
                        className="bg-black/50 border border-white/20 w-20 px-2 py-1 text-white focus:border-military-accent outline-none"
                      />
                    </td>
                    <td className="py-4">
                       {/* Inline Edit for Price */}
                      <div className="flex items-center">
                        <span className="mr-1">$</span>
                        <input 
                          type="number" 
                          value={product.price}
                          onChange={(e) => onUpdateProduct(product.id, 'price', parseFloat(e.target.value))}
                          className="bg-black/50 border border-white/20 w-24 px-2 py-1 text-white focus:border-military-accent outline-none"
                        />
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEditModal(product)}
                          className="p-2 bg-blue-900/30 hover:bg-blue-900 text-blue-400 hover:text-white border border-blue-900 transition-colors"
                          title="Edit Details"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(product.id)}
                          className="p-2 bg-red-900/30 hover:bg-red-900 text-red-500 hover:text-white border border-red-900 transition-colors"
                          title="Delete Asset"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ORDERS CONTENT */}
      {activeTab === 'ORDERS' && (
        <div className="bg-black/60 backdrop-blur-md border border-white/10 p-8 clip-angled-sm animate-fadeIn">
          <h3 className="text-xl font-heading font-bold text-white uppercase tracking-widest mb-6">
            Requisition Log
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-sm text-left">
              <thead>
                <tr className="border-b border-white/10 text-opaque-low text-xs">
                  <th className="py-3 font-normal tracking-widest">ID</th>
                  <th className="py-3 font-normal tracking-widest">OPERATOR</th>
                  <th className="py-3 font-normal tracking-widest">DATE</th>
                  <th className="py-3 font-normal tracking-widest">STATUS</th>
                  <th className="py-3 font-normal tracking-widest text-right">TOTAL</th>
                  <th className="py-3 font-normal tracking-widest text-right">MANIFEST</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors text-opaque-med">
                    <td className="py-4 text-white">{order.id}</td>
                    <td className="py-4">{order.customer.name}</td>
                    <td className="py-4 text-xs">{order.date}</td>
                    <td className="py-4">
                      <select 
                        value={order.status}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                        className={`bg-transparent border border-white/20 px-2 py-1 text-xs font-bold outline-none cursor-pointer ${
                          order.status === 'DEPLOYED' ? 'text-green-500 border-green-500/50' :
                          order.status === 'PENDING' ? 'text-yellow-500 border-yellow-500/50' :
                          'text-red-500 border-red-500/50'
                        }`}
                      >
                        <option value="PENDING" className="bg-black text-yellow-500">PENDING</option>
                        <option value="DEPLOYED" className="bg-black text-green-500">DEPLOYED</option>
                        <option value="CANCELED" className="bg-black text-red-500">CANCELED</option>
                      </select>
                    </td>
                    <td className="py-4 text-right text-white font-bold">${order.total.toFixed(2)}</td>
                    <td className="py-4 text-right">
                       <button 
                         onClick={() => setSelectedOrder(order)}
                         className="inline-flex items-center gap-2 text-military-accent hover:text-white transition-colors uppercase text-[10px] tracking-widest"
                       >
                         <Eye className="w-3 h-3" /> View / Print
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;