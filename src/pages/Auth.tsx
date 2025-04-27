
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        const { data: { session }, error } = await supabase.auth.signInAnonymously({
          options: {
            data: {
              phone: phone
            }
          }
        });
        
        if (error) throw error;
        
        if (!session) {
          toast.error("Login failed, please check your phone number");
          setLoading(false);
          return;
        }

        // After successful login, ensure wallet exists
        const { error: walletError } = await supabase
          .from('wallet')
          .insert({
            id: session.user.id,
            points: 0,
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        // If wallet already exists, that's fine - continue with login
        if (walletError && !walletError.message.includes('duplicate key')) {
          throw walletError;
        }

      } else {
        const { error: signUpError } = await supabase.auth.signInAnonymously({
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              phone: phone // This will be automatically added to auth.users.phone by our trigger
            }
          }
        });
        
        if (signUpError) throw signUpError;

        // Get the newly created user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User creation failed');

        // Create wallet for new user
        const { error: walletError } = await supabase
          .from('wallet')
          .insert({
            id: user.id,
            points: 0,
            updated_at: new Date().toISOString()
          });
        
        if (walletError) throw walletError;
      }

      toast.success(isLogin ? "Successfully logged in!" : "Successfully registered!");
      navigate('/');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin ? "Please enter your phone number to continue" : "Please fill in your information to register"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    required={!isLogin}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    required={!isLogin}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="123-456-7890"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : (isLogin ? "Login" : "Register")}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {isLogin ? "Need to create an account?" : "Already have an account?"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
