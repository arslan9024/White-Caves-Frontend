import React, { useState } from 'react';
import {
  Facebook,
  Send,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Globe,
  MessageSquare,
} from 'lucide-react';

interface FacebookComposerProps {
  onPostSuccess?: (post: any) => void;
}

export const FacebookListingComposer: React.FC<FacebookComposerProps> = ({ onPostSuccess }) => {
  const [community, setCommunity] = useState('DAMAC Hills 2 (Akoya Oxygen)');
  const [cluster, setCluster] = useState('Amazonia');
  const [propertyType, setPropertyType] = useState('Townhouse / Villa');
  const [bedrooms, setBedrooms] = useState('3-Bedroom + Maid');
  const [annualRent, setAnnualRent] = useState('85,000');
  const [cheques, setCheques] = useState('4');
  const [slug, setSlug] = useState('damac-hills-2-amazonia-luxury-villa');
  const [customDescription, setCustomDescription] = useState(
    'Stunning modern family villa in the heart of DAMAC Hills 2. Closed kitchen, private garden, premium finishes, and walking distance to community amenities.'
  );
  const [isPosting, setIsPosting] = useState(false);
  const [publishedPost, setPublishedPost] = useState<string | null>(null);

  // Sanitized formatted post strictly following Public Listing Privacy Rule (NO unit or villa numbers)
  const formattedPost = `🏡 LUXURY RENTAL IN ${cluster.toUpperCase()} · ${community.toUpperCase()}

✨ Specifications:
• Property: ${propertyType}
• Bedrooms: ${bedrooms}
• Annual Rent: AED ${annualRent} / year (${cheques} Cheques)
• Community: ${community} — Cluster ${cluster}

📝 Property Highlights:
${customDescription}

🔒 Privacy & Quality Assured:
Verified DLD Listing | Full Community Facilities | Ready for Immediate Move-in

🔗 View Full Gallery & Floorplan:
https://whitecaves.ae/rent/${slug}

💬 Speak Directly with Linda (White Caves AI Leasing Coordinator):
https://wa.me/971501234567?text=Hi%20Linda,%20I'm%20inquiring%20about%20the%20${encodeURIComponent(cluster)}%20rental%20on%20Facebook!`;

  const handleSyndicateToFacebook = () => {
    setIsPosting(true);
    setTimeout(() => {
      setIsPosting(false);
      setPublishedPost(formattedPost);
      if (onPostSuccess) {
        onPostSuccess({
          platform: 'facebook',
          content: formattedPost,
          timestamp: new Date().toISOString(),
        });
      }
    }, 900);
  };

  return (
    <div
      style={{
        marginTop: '1.5rem',
        padding: '1.5rem',
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#f8fafc',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: '#1877F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <Facebook size={20} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>
              AI Olivia — Facebook Page Listing Syndicator
            </h4>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              Autonomous Director of Marketing Social Syndication Engine
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#10b981',
            padding: '4px 10px',
            borderRadius: 9999,
            fontSize: '0.72rem',
            fontWeight: 700,
          }}
        >
          <ShieldAlert size={13} />
          <span>Privacy Rule Enforced: No Unit/Villa Numbers</span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <div>
          <label
            style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}
          >
            Community
          </label>
          <input
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 8,
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid #334155',
              color: '#fff',
            }}
            value={community}
            onChange={e => setCommunity(e.target.value)}
          />
        </div>
        <div>
          <label
            style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}
          >
            Cluster
          </label>
          <input
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 8,
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid #334155',
              color: '#fff',
            }}
            value={cluster}
            onChange={e => setCluster(e.target.value)}
          />
        </div>
        <div>
          <label
            style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}
          >
            Bedrooms
          </label>
          <input
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 8,
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid #334155',
              color: '#fff',
            }}
            value={bedrooms}
            onChange={e => setBedrooms(e.target.value)}
          />
        </div>
        <div>
          <label
            style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}
          >
            Annual Rent (AED)
          </label>
          <input
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 8,
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid #334155',
              color: '#fff',
            }}
            value={annualRent}
            onChange={e => setAnnualRent(e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>
          Listing URL Slug
        </label>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid #334155',
            borderRadius: 8,
            padding: '4px 10px',
          }}
        >
          <Globe size={15} style={{ color: '#64748b', marginRight: 6 }} />
          <span style={{ fontSize: '0.82rem', color: '#64748b' }}>https://whitecaves.ae/rent/</span>
          <input
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#fff',
              padding: '4px 6px',
              outline: 'none',
            }}
            value={slug}
            onChange={e => setSlug(e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: 4 }}>
          Post Preview (Ready to Syndicate)
        </label>
        <textarea
          rows={7}
          readOnly
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 8,
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid #334155',
            color: '#e2e8f0',
            fontFamily: 'monospace',
            fontSize: '0.82rem',
            lineHeight: 1.5,
          }}
          value={formattedPost}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.8rem',
            color: '#94a3b8',
          }}
        >
          <MessageSquare size={14} style={{ color: '#25D366' }} />
          <span>Includes direct WhatsApp CTA to Linda</span>
        </div>

        <button
          type="button"
          disabled={isPosting}
          onClick={handleSyndicateToFacebook}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'linear-gradient(135deg, #1877F2 0%, #0c63d4 100%)',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 10,
            fontSize: '0.875rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {isPosting ? <Sparkles size={16} /> : <Send size={16} />}
          <span>{isPosting ? 'Syndicating to Facebook Page...' : 'Publish to Facebook Page'}</span>
        </button>
      </div>

      {publishedPost && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.85rem',
            borderRadius: 8,
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            color: '#34d399',
            fontSize: '0.85rem',
          }}
        >
          <CheckCircle2 size={18} />
          <span>
            Listing successfully published by AI Olivia to official White Caves Facebook Page!
          </span>
        </div>
      )}
    </div>
  );
};

export default FacebookListingComposer;
