import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAxios from '../Hooks/useAxios';
import { AuthContext } from '../Context/AuthContext';

const Funding = () => {
    const axiosSecure = useAxiosSecure();
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);
    
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [donationAmount, setDonationAmount] = useState('');
    const [showModal, setShowModal] = useState(false);

    const loadCampaigns = async () => {
        try {
            setLoading(true);
            const res = await axiosSecure.get('/funding-campaigns');
            setCampaigns(res.data || []);
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCampaigns();
    }, []);

    const handleOpenModal = (campaign) => {
        setSelectedCampaign(campaign);
        setDonationAmount(''); 
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCampaign(null);
    };

    
    const handleDonateSubmit = async (e) => {
        e.preventDefault();
        
        const amount = parseInt(donationAmount);
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        const formData = {
            donateAmount: amount,
            donorEmail: user?.email,
            donorName: user?.displayName,
            campaignId: selectedCampaign?._id, 
            campaignName: selectedCampaign?.title
        };

         
      axiosInstance.post('/create-payment-checkout', formData).then(res => {
        console.log(res.data)
          window.location.href= res.data.url
        })
          
            
           
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading Campaigns...</div>;

    return (
        <div className="container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: '#333' }}>Funding Campaigns</h1>
                <p style={{ color: '#666' }}>Your small contribution can save a life.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
                {campaigns.map((campaign) => {
                    const progress = Math.min((campaign.raisedAmount / campaign.targetAmount) * 100, 100);
                    return (
                        <div key={campaign._id} style={{ border: '1px solid #eee', borderRadius: '15px', overflow: 'hidden', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <img src={campaign.image} alt={campaign.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                            <div style={{ padding: '20px' }}>
                                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem' }}>{campaign.title}</h3>
                                <p style={{ color: '#777', fontSize: '0.95rem', height: '60px', overflow: 'hidden' }}>{campaign.description}</p>
                                
                                <div style={{ margin: '20px 0' }}>
                                    <div style={{ background: '#f0f0f0', borderRadius: '10px', height: '12px', width: '100%' }}>
                                        <div style={{ width: `${progress}%`, background: '#e63946', height: '100%', borderRadius: '10px', transition: 'width 0.8s ease-in-out' }}></div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.9rem', fontWeight: '600' }}>
                                        <span>Raised: ৳{campaign.raisedAmount}</span>
                                        <span style={{ color: '#e63946' }}>Goal: ৳{campaign.targetAmount}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleOpenModal(campaign)}
                                    disabled={progress >= 100}
                                    style={{ width: '100%', padding: '12px', background: progress >= 100 ? '#ccc' : '#e63946', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
                                >
                                    {progress >= 100 ? 'Goal Reached' : '💝 Donate Now'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* MODAL SECTION */}
            {showModal && (
                <div 
                    onClick={handleCloseModal}
                    style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, backdropFilter: 'blur(4px)' }}
                >
                    <div 
                        onClick={(e) => e.stopPropagation()} 
                        style={{ background: '#fff', padding: '30px', borderRadius: '20px', width: '400px', maxWidth: '95%', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                    >
                        <h2 style={{ marginBottom: '5px' }}>Make a Donation</h2>
                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>To: {selectedCampaign?.title}</p>

                        <form onSubmit={handleDonateSubmit}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#444' }}>Select Amount</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                                    {[500, 1000, 2000].map(amt => (
                                        <button 
                                            key={amt}
                                            type="button"
                                            onClick={() => setDonationAmount(amt.toString())}
                                            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '6px', background: donationAmount === amt.toString() ? '#e63946' : '#fff', color: donationAmount === amt.toString() ? '#fff' : '#333', cursor: 'pointer' }}
                                        >
                                            ৳{amt}
                                        </button>
                                    ))}
                                </div>
                                
                                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#444' }}>Custom Amount</label>
                                <input
                                    type="number"
                                    name='donateAmount'
                                    placeholder="Enter amount"
                                    value={donationAmount}
                                    onChange={(e) => setDonationAmount(e.target.value)}
                                    autoFocus
                                    style={{ width: '100%', padding: '12px', border: '2px solid #eee', borderRadius: '10px', fontSize: '1.1rem', outline: 'none', boxSizing: 'border-box' }}
                                    required
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="button" onClick={handleCloseModal} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #ddd', background: '#f9f9f9', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
                                <button type="submit" style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: '#e63946', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>Pay with Stripe</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Funding;